"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/email";

export type ContactState = {
  status: "idle" | "success" | "error";
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "es").trim();

  if (!name || !email) {
    return { status: "error" };
  }

  const supabase = getSupabaseAdmin();

  // When Supabase isn't configured yet, log the lead so nothing is lost
  // during local development and the form still confirms success.
  if (!supabase) {
    console.log("[lead]", { nombre: name, email, whatsapp, mensaje: message, locale });
  } else {
    const { error } = await supabase.from("leads").insert({
      nombre: name,
      email,
      whatsapp: whatsapp || null,
      mensaje: message || null,
    });

    if (error) {
      console.error("[lead] insert error", error.message);
      return { status: "error" };
    }
  }

  // Email notification is best-effort: a delivery failure must not lose
  // the lead, which is already stored in Supabase at this point.
  await sendLeadEmail({
    nombre: name,
    email,
    whatsapp,
    mensaje: message,
  });

  return { status: "success" };
}
