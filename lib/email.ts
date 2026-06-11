import { Resend } from "resend";
import { CONTACT_EMAIL } from "./constants";

const FROM_ADDRESS = "Propia Digital <noreply@propiadigital.com>";

export type LeadEmail = {
  nombre: string;
  email: string;
  whatsapp: string;
  mensaje: string;
};

/**
 * Sends the lead notification email to the Propia Digital inbox.
 * No-ops when RESEND_API_KEY is missing so the form keeps working
 * locally and in environments without email configured.
 */
export async function sendLeadEmail(lead: LeadEmail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY no configurada, se omite el envío");
    return false;
  }

  const fecha = new Intl.DateTimeFormat("es-UY", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Montevideo",
  }).format(new Date());

  const lines = [
    `Nombre: ${lead.nombre}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp || "—"}`,
    `Mensaje: ${lead.mensaje || "—"}`,
    `Fecha: ${fecha}`,
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
      <h2 style="color: #1b4f72; margin-bottom: 16px;">Nueva consulta desde Propia Digital</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 4px 16px 4px 0; color: #6b6b6b;">Nombre</td><td style="padding: 4px 0; font-weight: 600;">${lead.nombre}</td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6b6b6b;">Email</td><td style="padding: 4px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6b6b6b;">WhatsApp</td><td style="padding: 4px 0;">${lead.whatsapp || "—"}</td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6b6b6b; vertical-align: top;">Mensaje</td><td style="padding: 4px 0;">${lead.mensaje || "—"}</td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6b6b6b;">Fecha</td><td style="padding: 4px 0;">${fecha}</td></tr>
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_EMAIL,
      replyTo: lead.email,
      subject: "Nueva consulta desde Propia Digital",
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("[email] error de Resend:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] excepción al enviar:", err);
    return false;
  }
}
