// Google Apps Script — Lead Capture Webhook
// NOTE: This file documents the actually-deployed script's field shape
// (Date, phone, plotSize, city, question) so it stays in sync with
// src/data/leadNotifier.ts. If you redeploy from here, the columns are
// intentionally narrower than an earlier draft — no Name column.

const SHEET_NAME = 'Leads';
const HEADERS = ['Date', 'Time', 'Phone', 'Plot Size', 'City', 'Question'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    const now = new Date();
    sheet.appendRow([
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm'),
      data.phone || '',
      data.plotSize || '',
      data.city || '',
      data.question || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the Web App URL directly in a browser to sanity-check it's
// live (returns a simple OK message instead of a confusing error page).
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Lead webhook is live. Use POST to add a lead.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
