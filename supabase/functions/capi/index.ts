import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const PIXEL_ID = Deno.env.get("META_CAPI_PIXEL_ID")!;
const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN")!;
const API_VERSION = Deno.env.get("META_CAPI_API_VERSION") || "v21.0";
const TEST_EVENT_CODE = Deno.env.get("META_CAPI_TEST_EVENT_CODE") || "";

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function maybeHash(v?: string | null): Promise<string | undefined> {
  if (!v) return undefined;
  const cleaned = v.trim().toLowerCase();
  if (/^[a-f0-9]{64}$/i.test(cleaned)) {
    return cleaned;
  }
  return await sha256(cleaned);
}

async function maybeHashPhone(v?: string | null): Promise<string | undefined> {
  if (!v) return undefined;
  const cleaned = v.replace(/\D/g, "");
  if (/^[a-f0-9]{64}$/i.test(cleaned)) {
    return cleaned;
  }
  return await sha256(cleaned);
}

async function maybeHashName(v?: string | null): Promise<string | undefined> {
  if (!v) return undefined;
  const cleaned = v
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
  if (/^[a-f0-9]{64}$/i.test(cleaned)) {
    return cleaned;
  }
  return await sha256(cleaned);
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (!body?.event_id || !body?.event_name) {
      return new Response(
        JSON.stringify({ error: "event_id e event_name são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Dedup no servidor
    const { error: dedupError } = await supabase
      .from("capi_event_dedup")
      .insert({ event_id: body.event_id, event_name: body.event_name });
    if (dedupError) {
      if (dedupError.code === "23505") {
        return new Response(
          JSON.stringify({ status: "duplicate" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw dedupError;
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const eventTime = Math.floor(Date.now() / 1000);

    const emailHash = await maybeHash(body.email);
    const phoneHash = await maybeHashPhone(body.phone);
    const firstNameHash = await maybeHashName(body.first_name);
    const lastNameHash = await maybeHashName(body.last_name);
    const externalIdHash = await maybeHash(body.external_id);

    const { data: inserted, error: insertError } = await supabase
      .from("capi_events")
      .insert({
        event_id: body.event_id,
        event_name: body.event_name,
        event_source_url: body.event_source_url,
        email_hash: emailHash,
        phone_hash: phoneHash,
        first_name_hash: firstNameHash,
        last_name_hash: lastNameHash,
        external_id_hash: externalIdHash,
        fbp: body.fbp,
        fbc: body.fbc,
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        currency: body.currency || "BRL",
        value: body.value,
        content_ids: body.content_ids,
        content_type: body.content_type,
        content_name: body.content_name,
        order_id: body.order_id,
        test_event_code: TEST_EVENT_CODE || null,
        status: "pending",
      })
      .select("id")
      .single();
    if (insertError) throw insertError;

    const userData: Record<string, unknown> = {};
    if (emailHash) userData.em = [emailHash];
    if (phoneHash) userData.ph = [phoneHash];
    if (firstNameHash) userData.fn = [firstNameHash];
    if (lastNameHash) userData.ln = [lastNameHash];
    if (externalIdHash) userData.external_id = [externalIdHash];
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;

    const customData: Record<string, unknown> = { currency: body.currency || "BRL" };
    if (typeof body.value === "number") customData.value = body.value;
    if (body.content_ids) customData.content_ids = body.content_ids;
    if (body.content_type) customData.content_type = body.content_type;
    if (body.content_name) customData.content_name = body.content_name;
    if (body.order_id) customData.order_id = body.order_id;

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: body.event_name,
          event_time: eventTime,
          event_id: body.event_id,
          action_source: "website",
          event_source_url: body.event_source_url,
          user_data: userData,
          custom_data: customData,
        },
      ],
    };
    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const fbRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const fbJson = await fbRes.json();
    const ok = fbRes.ok && !fbJson.error;

    await supabase
      .from("capi_events")
      .update({
        status: ok ? "sent" : "error",
        fb_response: fbJson,
        fb_trace_id: fbJson?.fbtrace_id ?? null,
        error_message: ok ? null : JSON.stringify(fbJson?.error ?? fbJson),
        raw_payload: payload,
        enviado_em: ok ? new Date().toISOString() : null,
        tentativas: 1,
      })
      .eq("id", inserted!.id);

    return new Response(
      JSON.stringify(ok ? { status: "sent", fb: fbJson } : { status: "error", detail: fbJson }),
      {
        status: ok ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("[capi] erro:", err);
    return new Response(
      JSON.stringify({ error: "Falha ao processar evento CAPI" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
