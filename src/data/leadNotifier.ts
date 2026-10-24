import { LeadInfo } from './chatKnowledgeBase';

function isConfigured(): boolean {
  return Boolean(process.env.SHEET_WEBHOOK_URL);
}

// Sends the new lead to a Google Apps Script Web App, which appends it as
// a row in a Google Sheet. Best-effort only — a failure here must never
// break the chat response, since upsertLeadRow already persisted the lead
// to the local Excel sheet as a durable backup.
export async function notifyNewLead(lead: LeadInfo, lastMessage: string): Promise<void> {
  if (!lead.phone || !isConfigured()) return;

  // Field names here must match the deployed Apps Script's expected keys
  // exactly (phone, plotSize, city, question) — there is no "name" column
  // in that sheet, so it's intentionally left out of this payload.
  const plotSize = lead.dimensions ? `${lead.dimensions} (${lead.area} sqft)` : (lead.area ? `${lead.area} sqft` : '');
  const payload = {
    phone: lead.phone,
    plotSize,
    city: lead.location || '',
    question: lastMessage.slice(0, 300)
  };
  const body = JSON.stringify(payload);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    // Apps Script Web Apps 302-redirect the actual POST to a script.googleusercontent.com
    // URL, and their doPost() only reads e.postData reliably when the
    // Content-Type isn't application/json (json bodies sometimes land in
    // e.postData.contents fine, but text/plain avoids any parsing edge
    // cases on Google's side) — fetch already follows the redirect by
    // default, this just keeps the content type Apps-Script-friendly.
    const res = await fetch(process.env.SHEET_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      redirect: 'follow',
      signal: controller.signal
    });
    if (!res.ok) {
      console.warn('Sheet lead webhook failed:', res.status, await res.text().catch(() => ''));
    }
  } catch (err: any) {
    console.warn('Sheet lead webhook error:', err?.message);
  } finally {
    clearTimeout(timeout);
  }
}
