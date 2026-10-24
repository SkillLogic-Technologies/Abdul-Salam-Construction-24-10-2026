import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { LeadInfo } from './chatKnowledgeBase';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.xlsx');
const SHEET_NAME = 'Leads';

const COLUMNS = [
  'Date',
  'Time',
  'Name',
  'Phone',
  'Location',
  'Plot Dimensions',
  'Area (sqft)',
  'Package Preference',
  'Last Message',
  'Chat Language'
] as const;

// A lead is "worth writing" once there's enough to act on or follow up
// with — a phone number alone is enough (most followable), or a name
// plus at least one other signal (location/area/package) so an engaged
// visitor still gets captured even before they hand over a number.
export function isLeadSaveWorthy(lead: LeadInfo): boolean {
  if (lead.phone) return true;
  const otherSignals = [lead.location, lead.area, lead.packagePreference].filter(Boolean).length;
  return Boolean(lead.name) && otherSignals > 0;
}

function readExistingRows(): Record<string, unknown>[] {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    const workbook = XLSX.readFile(LEADS_FILE);
    const sheet = workbook.Sheets[SHEET_NAME];
    if (!sheet) return [];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } catch {
    // Corrupt/locked file (e.g. open in Excel mid-write) — don't crash the
    // chat request over it, just start a fresh in-memory row set.
    return [];
  }
}

function writeRows(rows: Record<string, unknown>[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...COLUMNS] });
  worksheet['!cols'] = COLUMNS.map((c) => ({ wch: c === 'Last Message' ? 50 : 16 }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);
  XLSX.writeFile(workbook, LEADS_FILE);
}

// Appends or updates one lead row, keyed by phone number, so a returning
// customer who keeps chatting updates their existing row instead of
// duplicating it.
export function upsertLeadRow(lead: LeadInfo, lastMessage: string, detectedLanguageHint?: string): void {
  if (!isLeadSaveWorthy(lead)) return;

  const now = new Date();
  const row: Record<string, unknown> = {
    Date: now.toLocaleDateString('en-IN'),
    Time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    Name: lead.name || '',
    Phone: lead.phone || '',
    Location: lead.location || '',
    'Plot Dimensions': lead.dimensions || '',
    'Area (sqft)': lead.area || '',
    'Package Preference': lead.packagePreference || '',
    'Last Message': lastMessage.slice(0, 300),
    'Chat Language': detectedLanguageHint || ''
  };

  const rows = readExistingRows();
  // Prefer an exact phone match (most reliable identity). If this message
  // is the one that just added the phone, the existing row for this person
  // was saved without one — find it by name so it gets upgraded in place
  // instead of creating a duplicate row.
  let existingIndex = lead.phone ? rows.findIndex((r) => String(r.Phone) === String(lead.phone)) : -1;
  if (existingIndex < 0 && lead.name) {
    existingIndex = rows.findIndex((r) => !r.Phone && String(r.Name).toLowerCase() === String(lead.name).toLowerCase());
  }

  if (existingIndex >= 0) {
    rows[existingIndex] = { ...rows[existingIndex], ...row, Date: rows[existingIndex].Date };
  } else {
    rows.push(row);
  }

  writeRows(rows);
}
