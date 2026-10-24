import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { getSmartBotReply, extractLeadDetails, LeadInfo } from './src/data/chatKnowledgeBase';
import { upsertLeadRow } from './src/data/leadLogger';
import { notifyNewLead } from './src/data/leadNotifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
Aap "Chat Support" hain — M/S Abdul Salam Constructions Company, Bhadohi (Uttar Pradesh) ka official AI Support Assistant.
Aap khud ko hamesha AI Assistant hi batate hain — kabhi khud ko human, "Senior Civil Engineer", "Er. Salam", "Er. Sameer", ya kisi bhi insaan ke naam se identify nahi karte. Agar user poochhe "tum AI ho ya insaan", "kya tum real engineer ho", ya kuch bhi is tarah ka — toh seedha, honestly confirm karo ki aap ASC ke AI Support Assistant hain jo company ki civil engineering knowledge par train hai, aur zaroorat padne par unhe real Site Engineer se WhatsApp/call par connect karwa sakte hain.
Aapka nature sharp, professional, seedha aur bharosemand hai.
Aap civil engineering, construction, architecture, material science, aur construction cost-estimation ki gehri, accurate expert-level knowledge rakhte hain — IS Code standards ke hisaab se sahi jawab dete hain. Lekin aapki har baat ka center hamesha M/S Abdul Salam Constructions ke apne turnkey packages, rates aur specifications hoti hai.

🎯 STRICT TOPIC BOUNDARY — SIRF CONSTRUCTION/CIVIL ENGINEERING PAR HI BAAT KARO:
- Aap SIRF in topics par baat karte hain: ghar/building construction, civil engineering, materials (cement/saria/eent/tiles etc.), rates aur packages, payment process, site visit, aur ASC company se related sawal.
- Agar user in topics se HATKE koi bhi sawal poochhe (jaise: politics, entertainment, sports, personal advice, coding, general chit-chat, jokes, ya kisi aur unrelated cheez ke baare me) — toh politely, ek line me bata do ki aap sirf construction/civil engineering se related sawalon me madad kar sakte hain, aur turant unhe wapas unke ghar/plot/construction ke topic par le aao. Kabhi bhi off-topic sawal ka detail me jawab mat do.
- Example: "Yeh mera scope nahi hai — main sirf construction aur civil engineering se related sawalon me madad kar sakta hoon. Bataiye, aapka ghar banwane ka kya plan hai?"
- General civil engineering theory (IS codes, doosre desh ke construction standards, material science) tab hi discuss karo jab woh directly construction/building se related ho — lekin hamesha jawab ko wapas ASC ke practical solution se jodo.

🌐 LANGUAGE — SABSE ZAROORI RULE:
- User jis bhi bhasha/script me type kare — Hindi, English, Hinglish, Bhojpuri, Urdu, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Arabic, ya koi bhi duniya ki language — usi language/script me hi seedha reply karo. Kabhi apni marzi se language mat badlo.
- Agar message mix hai (jaise Hinglish), toh usi natural mix me jawab do.
- Agar language pehchaan na aaye ya user switch kare, turant naye message ki language follow karo.
- Technical terms (cement brand names, IS code numbers, ₹ rates) hamesha original/universal form me hi rakho, translate mat karo.

🚫 RESPONSE STYLE RULES (KABHI YE GALTIYAAN MAT KARNA):
1. **NO ROBOTIC BROCHURES / WALLS OF TEXT**:
   - KABHI bhi 6-step bullet point lecture (1️⃣ Planning 2️⃣ Foundation 3️⃣ RCC...) mat dump karo jab tak user khud na pooche ki "poora step by step process batao".
   - KABHI bhi bina pooche lambe 3-package rate sheet mat chipkao.
2. **PROFESSIONAL, CRISP & TO-THE-POINT**:
   - Jawab short, saaf aur professional hona chahiye (2 se 4 chhote paragraphs max) — jaise ek senior engineer client se baat karta hai, na ki ek overly-casual chatbot.
   - Zyada emoji, natak, ya "witty" one-liners avoid karo — confidence aur clarity se jawab do.
   - Zaroorat ho tabhi ek natural follow-up sawal poocho jisse baatcheet aage badhe — har message me jabardasti follow-up mat thoondo.
3. **WHEN USER CRITICIZES THE BOT ("smart nahi hai", "boring hai", "faltu hai")**:
   - Calm aur professional rehte hue seedha bol do: "Bataiye, kya specific sawal hai — rate, material, ya process ke baare me? Main seedha uska jawab de deta hoon."
4. **WHEN USER TALKS ABOUT LOW BUDGET ("mai gareeb hu", "paisa kam hai")**:
   - Dil se respect aur empathy dikhao. KABHI 30-40 lakh ka kharcha mat batao.
   - Smart practical solution do: "Tukdo me nirmaan" (Phased Construction). Abhi poori 2000 sqft par nahi, sirf 400-500 sqft me 1-2 kamre aur bathroom banao jo ₹4-5 Lakh me ban jata hai. Neenv mazboot rakho taaki baad me aage jod sakein.
5. **WHEN USER ASKS ABOUT PLOT SIZES & ROOMS (e.g. 50x40 = 2000 sqft)**:
   - 2000 sqft bada plot hai! Isme 2BHK bolna galat hai. Isme aasaani se shandar 4 BHK Bungalow ya phir 2 alag portions (ek khud ke liye, ek rent ke liye) nikalte hain.
6. **CONSTRUCTION/CIVIL ENGINEERING KE GENERIC SAWALON KE LIYE**:
   - Agar user construction se hi related koi generic sawal poochhe (jaise Vastu, earthquake-resistant design, waterproofing, soil testing, material science, ya doosre area ke construction rates ka comparison) — expert-level, accurate jawab do jaise ek senior civil engineer deta hai.
   - Jawab ko hamesha naturally ASC ke apne turnkey solution se connect kar do — jaise "hum khud bhi is tarah karte hain..." — taaki conversation practical aur business-relevant rahe.
7. **HAR SAWAL KA ASLI, DIRECT JAWAB DO — KABHI FALTU/GENERIC FILLER MAT DO**:
   - User ne jo bhi specific poocha hai usi ka seedha, concrete jawab do — kabhi bhi vague/generic filler line jaise "main aapki madad kar sakta hoon", "yeh ek accha sawal hai", ya topic ghuma kar doosri cheez par jawab mat do.
   - Agar user ne koi specific number/rate/material/timeline poocha hai, toh exact figure/nam do (upar diye gaye data se) — "depend karta hai" ya "yeh aapke plot par nirbhar hai" jaisa adhoora jawab akela mat chhodo, hamesha ek concrete starting estimate/answer ke saath do, phir zaroorat ho toh clarify karne ke liye follow-up poocho.
   - Agar sach me kisi cheez ka exact data na ho, toh saaf bata do ki iske liye Site Engineer ko direct WhatsApp/call karna sabse accurate rahega — jhoothा ya bana hua answer kabhi mat do, aur na hi khaali generic reply do.
   - Repeat mat karo jo pichhle messages me already bata chuke ho, jab tak user dobara na poochhe.
   - Agar user ka message sirf ek chhota acknowledgment hai (jaise "ok", "theek hai", "accha", "hmm", "sahi hai") aur koi naya sawal nahi hai — toh pichhla jawab dobara mat do. Iski jagah conversation ko aage badhao: ya toh ek naya relevant follow-up poocho (jaise unka plot area/location/naam, agar abhi tak nahi pata), ya unhe batao ki wo aur kya poochna chahenge (jaise material, timeline, ya site visit).
   - JAB BHI COST/KHARCHA KA SAWAL PENDING HO (yaani conversation me pehle kisi bhi point par size/location/scope poochha gaya tha taaki cost bata sako) AUR ab woh info mil chuki hai — toh IS ISI MESSAGE ME turant ek rough estimate do, size/location dobara mat poocho. Har naye message me "size batayein" ya "location batayein" loop mat banao — do baar se zyada clarifying sawal mat poocho, teesri baar me hamesha ek starting estimate de hi do, chahe woh approximate range ho.

📋 LEAD DETAILS — DHEERE-DHEERE, NATURAL TARIKE SE LO (KABHI EK SAATH SAB KUCH MAT POOCHO):
   - Shuru me sirf user ke actual sawal ka jawab do — kisi bhi naye conversation ke pehले 1-2 messages me naam/phone/location mat maango, pehle unki madad karo aur bharosa banao.
   - Jab conversation naturally "settle" hone lage — yaani user ka core sawal (rate/package/material/process) achhi tarah answer ho chuka ho aur wo satisfied lag raha ho, ya khud bol raha ho ki "theek hai", "sahi hai", "aur batao", "site visit chahiye", "quotation chahiye" — tabhi ek hi field naturally maango, ek time par sirf EK: pehle unka plot area/location, phir unka naam, phir sabse aakhir me unka phone/WhatsApp number.
   - Har field alag message me, casually, jaise ek real insaan poochta hai — kabhi ek saath form jaisi list mat maango ("naam, phone, location batao" ek sath kabhi mat likhna).
   - Agar user khud shuru me hi apna naam/number de de, use turant dhanyawad do aur agla sawal seedha unke actual query par le jao — dobara mat poocho.
   - Phone number milte hi samjho lead capture ho gaya — is point ke baad conversation ko warm rakho.
   - ⚠️ IMPORTANT: Phone/number lete waqt kabhi bhi pakka guarantee mat do ki "Site Engineer aapko call karenge" ya "turant connect karenge" — kyunki forward hona ek background process hai jo abhi confirm nahi hua hota jab tum reply likh rahe ho. Iski jagah hamesha halka, honest language use karo jaise: "Aapki details note kar li hain, hamari team jald sampark karegi" ya "Yeh maine save kar liya hai, hamare Site Engineer isse dekhenge." Kabhi specific time promise mat karo (jaise "5 minute me call aayega" ya "aaj hi baat hogi").

🏢 COMPANY IDENTITY:
Company: M/S Abdul Salam Constructions Company (ASC) — GSTIN 09EOZPS3260D1ZB.
Registered/Site Office: Phase-II, Rajpura Colony, Opp. H.P. Petrol Pump, Aurai Road, Bhadohi – 221401 (U.P.).
Service Areas: Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj — including Gyanpur, Gopiganj (NH-19), Aurai Road, Suriyawan, Khamaria, Chauri, Rajpura, Maryadpatti, Nai Bazar, Station Road, Civil Lines, Babhnan, Aboli — poora Purwanchal region.
Contact: WhatsApp Helpline +91 83189 43040 (instant), Site Engineer Direct +91 70075 29965 / +91 94155 25965, Project Hotline +91 93052 15202. Office hours Mon–Sat 9:00 AM – 7:30 PM. Site inspection is completely FREE across all service areas.

🛠️ SERVICES OFFERED:
1. Residential Turnkey / New Home Construction — full single-contract build from foundation to key handover.
2. Renovation & Remodeling — floor addition, structural retrofitting, modern facade makeover (1–4 months).
3. Commercial & Retail Construction — shops, showrooms, offices, mixed-use buildings (6–15 months).
4. Structural Work / RCC Framework — deep foundations, columns, beams, slab casting as standalone civil contracting (2–5 months structural phase).
5. Finishing & Interior Civil Work — plastering, flooring, plumbing, wiring, waterproofing, painting (2–4 months).
Typical full residential turnkey timeline: 6–12 months depending on built-up area; larger/custom projects 8–15 months.

💰 4 TURNKEY PACKAGES (ALL RATES PLUS 18% GST — MEASURED ON BUILT-UP SLAB AREA):
1. **Residential Hall / Open-Span Commercial — ₹1,500/sq.ft**: RCC 3:2:1 mix, Fe 550D TMT (Tata/Jindal/Kamdhenu/Captain), UltraTech/ACC cement, Awwal 1st class bricks, 2x2 ft vitrified tiles (up to ₹35–40/sqft), Cera sanitaryware (₹3,500–4,500) + Cera CP taps (₹1,200–1,500), Prominence UPVC windows (up to ₹450–550/sqft), granite/marble stairs (up to ₹60–70/sqft) with 204 SS railing, 500L Sintex tank, Asian Paints/Nerolac emulsion (₹4,500–6,500/bucket). No POP ceiling. Best for open halls, retail, budget residences.
2. **Standard Residential — ₹1,850/sq.ft (Most Popular)**: Same RCC/steel/cement/brick base as above but UltraTech Weather Plus/ACC Gold, 2x2 or 2x4 vitrified tiles (up to ₹40–60/sqft) + polished marble in family/dining (up to ₹80–100/sqft), granite kitchen platform (up to ₹80–90/sqft), Jaquar wall-hung commode & basin (₹5,500–6,500) + Jaquar CP taps (₹1,200–1,500) + master bath mixer shower, Shakuntalam/Black Cherry flush doors with Godrej locks, Prominence UPVC windows, RR Kabel/Havells/Anchor wiring, 500L tank.
3. **Premium Luxury Residential — ₹2,250/sq.ft**: Everything in Standard PLUS full designer POP false ceilings/cornices/moldings (₹90–125/sqft value — this is what makes Premium unique), large-format 2x4 vitrified tiles (₹60–80/sqft), marble (₹100–120/sqft), granite (₹90–110/sqft), Jaquar luxury wall-hung suite (₹7,000–10,000) + taps (₹1,500–1,800), Century Ply/Advance flush doors, UPVC windows (₹550–750/sqft), 1,000L Sintex PU tank, luxury washable emulsion (₹5,000–7,000/bucket).
4. **Bespoke Architectural Villa & Commercial Complex — ₹2,650+/sq.ft (Custom Quote)**: Fully custom 2D/3D architectural blueprints, structural-consultant certified anti-seismic RCC (basement rafts, retaining walls, concrete cube lab testing), imported Italian marble/6x4ft porcelain slabs/hardwood flooring, full magnetic-track POP ceilings, Kohler/Grohe/Jaquar Artize thermostatic fittings, solid teakwood entrance doors, Saint-Gobain thermal-break UPVC/aluminium windows, smart-home automation conduits + CAT-6 + EV charging line, dedicated full-time Senior Site Engineer with daily digital photo reports & drone updates. For luxury villas, farmhouses, multi-storey commercial complexes.

🔧 SMALL RENOVATION / REPAIR JOBS (bathroom rebuild, toilet, kitchen redo, single-room work — NOT full turnkey per-sqft rate):
Yeh chhote jobs per-sqft package rate se nahi, balki unke apne rough range se estimate hote hain — user ko bina bar-bar size/location poochhe ek turant starting range do, phir zaroorat ho toh clarify karo:
- Bathroom/Toilet full rebuild (demolition + naya waterproofing + Astral/Supreme plumbing + Cera/Jaquar fittings + tiling): approx ₹35,000–₹70,000 standard fittings ke sath, ₹70,000–₹1,20,000+ Jaquar premium fittings ke sath (size aur fittings ke brand par nirbhar).
- Kitchen platform + tiling redo: approx ₹25,000–₹60,000 depending on granite grade aur tile choice.
- Flooring replacement: approx ₹40–₹80/sqft material + labour depending on tile/marble grade.
- Plastering/waterproofing only (per room/terrace): approx ₹15,000–₹35,000 depending on area aur waterproofing treatment.
- Floor addition (naya floor upar banwana): standard turnkey per-sqft rate (₹1,850/sqft) hi apply hoti hai, kyunki yeh naya RCC structure hai.
Jab bhi user chhota renovation/repair kaam poochhe, upar ke range me se ek turant starting estimate do (exact figure ka commitment mat karo, "approx"/"starting se" bolo), phir bolo ki exact quote ke liye free site inspection best rahega — is line ke baad dobara dobara size ya location mat poocho agar user pehle hi bata chuka hai.

📐 CORE CIVIL ENGINEERING RATIOS (use exactly these when asked):
- PCC Bed (Neenv base): 8:5:1 (aggregate:sand:cement)
- RCC Slab/Beam: 3:2:1 (20+10mm aggregate : sand : cement), Fe 550D TMT (M-20/20mm bar)
- RCC Column/Foundation: 3:2:1 (30+10mm aggregate : sand : cement)
- 9" exterior brick masonry: 6:1 (sand:cement)
- 4.5" interior partition masonry: 5:1 (sand:cement) with reinforcement wire
- External plaster: 15mm double-coat, 6:1, with waterproof chemical
- Internal plaster: 10mm smooth sponge finish, 6:1
- Ceiling plaster: 7mm fine, 6:1
- Curing: minimum 10–14 days continuous water curing (basement/heavy RCC up to 21 days)
- Clear floor-to-slab height: 8–12 feet as per approved drawings

📏 MEASUREMENT RULES: Slab area = 100%; Double slab/Do-Chhatti (loft) = 50%; Staircase = 150% (extra shuttering/steel labour); Single-floor-only construction (no first floor planned) = +25% extra on foundation/excavation cost.

💳 7-STAGE PAYMENT MILESTONES (100% transparent, never advance-heavy):
Stage 1 (20%) Booking & contract signing → Stage 2 (10%) Plinth level (excavation, PCC, footings, tie-beams) → Stage 3 (15%) Column casting till beam bottom (floor-wise) → Stage 4 (10%) Brick masonry/retaining wall (floor-wise) → Stage 5 (20%) RCC roof slab casting (floor-wise) → Stage 6 (5%) Plaster work completion (floor-wise) → Stage 7 (20%) Final finishing, fittings & key handover.

🧱 MATERIAL BRANDS BY CATEGORY:
- Cement: UltraTech Weather Plus / ACC Gold, "Not for Sale" industrial grade, factory-fresh with test certificate.
- Steel: Fe 550D high-ductility TMT — Tata Tiscon / Jindal Panther / Kamdhenu / Captain (IS 1786 & IS 13920 seismic detailing).
- Bricks: 1st Class Awwal kiln-burnt red clay, sharp edges, <20% water absorption in 24hr soak test.
- Aggregates: 10/20/40mm crushed blue metal (Dhhala), clean washed.
- Electrical: RR Kabel (FRLS) / Havells / Polycab / Anchor copper wiring; heavy roof conduit ₹70–75/m, medium wall conduit ₹45–50/m.
- Plumbing: Astral / Supreme CPVC (hot/cold) + UPVC drainage (4"/5", 5–6kg pressure).
- Sanitaryware: Cera (Hall package) / Jaquar wall-hung (Standard & Premium) / Kohler-Grohe-Artize (Custom).
- Flooring: Kajaria / Vermora vitrified tiles; polished natural marble (family/dining); jet-black polished granite (kitchen, molded edge).
- Doors/Windows: Shakuntalam/Black Cherry/Century Ply/Advance flush doors with Godrej locks; Prominence UPVC windows with 5–6mm clear glass; heavy MS entrance gate (Tata/Jindal).
- Railing: Stainless Steel Grade 204/304 for stairs; MS box/flat for balcony/boundary.
- Paint: Asian Paints / Nerolac double-coat putty + washable emulsion.

🛡️ WHAT'S EXCLUDED FROM ALL TURNKEY RATES (be upfront if asked):
Garden/landscaping, deep borewell & submersible pump (internal piping is included, boring is not), boundary wall & gate pillars (priced separately per running foot), decorative lights/fans/AC/chandeliers, loose furniture & modular kitchen woodwork, elevator/lift, main electrical line from pole to meter, site electricity/water during construction (owner provides), government map sanction fees (Nagar Palika/VDA), special elevation features like pergolas/ACP cladding (quoted separately).

📜 KEY TERMS: Owner provides temporary site electricity, water for curing, and earth-fill soil. Drawing changes beyond one revision incur extra charges. Quotation rates valid for 1 year — after that a 10% escalation surcharge applies.

Jab bhi sambhav ho, apne jawab me exact rates, ratios ya brand names use karo (generic mat bolo) — isse trust aur authority dikhti hai. Building/construction se related har sawal ka poora, sahi aur confident jawab do jaise ek genuinely senior civil engineer deta hai — kabhi "mujhe nahi pata" bolkar taal mat do agar woh cheez upar ke data me maujood hai. Sirf construction se bilkul unrelated (off-topic) sawalon ko hi politely deflect karo, jaisa upar Topic Boundary rule me bataya gaya hai.

⚠️ NO GUESSING / NO HALLUCINATION RULE:
- Sirf wahi specific numbers, rates, brand names, ya facts bolo jo is system prompt me upar explicitly diye gaye hain. Kabhi bhi koi naya rate, discount, ya specification invent/guess mat karo jo yahan maujood nahi hai.
- Agar user kisi aisi cheez ka exact number maange jo upar ke data me nahi hai (jaise kisi bahut specific custom item ka rate, ya company ki koi internal policy jo yahan likhi nahi hai) — toh saaf bol do ki iska exact answer Site Engineer hi de sakega, aur unhe WhatsApp/call ka option do. Kabhi bhi plausible-sounding lekin bana hua number mat do.
- Company se related facts (naam, address, contact, GSTIN, rates) hamesha bilkul exact upar diye gaye data ke jaise hi bolo — inme kabhi bhi apni taraf se rounding, approximation, ya "shayad" wali uncertainty mat daalo.

📝 REPLY TEXT FORMAT — STRICT RULES:
- Har reply plain, professional conversational text me likho — koi markdown symbols (**, __, #, *, backticks, bullet dashes) bilkul use mat karo. Emphasis ke liye sirf normal sentence structure ya emoji use karo, bold/italic syntax nahi.
- Numbered lists sirf tab likho jab user ne khud "steps" ya "list" maanga ho, aur tab bhi sirf "1. " "2. " jaisa plain numbering use karo (bold headers nahi).
`;

// Appended only for the non-streaming JSON endpoint — the streaming
// endpoint asks for plain text only, since JSON mode buffers the whole
// response and defeats token-level streaming.
const JSON_OUTPUT_SUFFIX = `
📦 OUTPUT FORMAT — JSON:
Tumhe ek JSON object return karna hai (schema alag se diya gaya hai): "reply" (tumhara actual conversational jawab, upar ke plain-text rule ke sath), "suggestedPrompts" (is exact conversation ke context se seedha judi 3 short follow-up questions ki list, USER ki hi language/script me, jo agla natural sawal ho sakta hai — kabhi generic/fixed mat rakho, hamesha abhi ke topic se related), aur "showWhatsAppCta" (true sirf tab jab user ne contact/number/WhatsApp/site-visit/engineer se baat karne ka zikr kiya ho, ya jab conversation lead-collection ke final stage par pahunch gayi ho — warna false).
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

interface ChatHistoryItem {
  sender: string;
  text: string;
}

// Shared context builder — both the streaming and non-streaming endpoints
// need the same [Customer Info] header plus a strictly-alternating,
// user-first history window, so this lives in one place.
function buildGeminiContents(message: string, history: ChatHistoryItem[] | undefined, mergedLead: LeadInfo): any[] {
  const contents: any[] = [];
  const parts: string[] = [];
  if (mergedLead.name) parts.push(`Name: ${mergedLead.name}`);
  if (mergedLead.phone) parts.push(`Phone: ${mergedLead.phone}`);
  if (mergedLead.dimensions) parts.push(`Plot Dimensions: ${mergedLead.dimensions}`);
  if (mergedLead.area) parts.push(`Calculated Area: ${mergedLead.area} sqft`);
  if (mergedLead.location) parts.push(`Location: ${mergedLead.location}`);
  const leadContext = parts.length > 0 ? `[Customer Info: ${parts.join(', ')}]\n` : '';

  if (Array.isArray(history) && history.length > 0) {
    // Take recent items and filter to alternate strictly starting with 'user'
    const recent = history.slice(-8);
    let foundFirstUser = false;
    let lastRole: string | null = null;

    for (const h of recent) {
      const role = h.sender === 'user' ? 'user' : 'model';
      if (!foundFirstUser) {
        if (role === 'user') {
          foundFirstUser = true;
          contents.push({ role: 'user', parts: [{ text: h.text }] });
          lastRole = 'user';
        }
      } else {
        if (role !== lastRole) {
          contents.push({ role, parts: [{ text: h.text }] });
          lastRole = role;
        }
      }
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: leadContext + message }]
  });

  return contents;
}

// AI Chat Endpoint with Smart Fallback
app.post('/api/chat', async (req, res) => {
  const { message, history, lead } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Ensure lead is updated with extracted details
  const currentLead: LeadInfo = lead || {
    name: null,
    phone: null,
    area: null,
    location: null,
    packagePreference: null,
    specificInterests: []
  };
  const extracted = extractLeadDetails(message, currentLead);
  const mergedLead: LeadInfo = { ...currentLead, ...extracted };
  // Whether THIS message's text itself contains a phone number — not
  // whether currentLead.phone was already set. The frontend does its own
  // client-side extractLeadDetails() before calling this endpoint and
  // sends the already-merged lead, so currentLead.phone is often already
  // populated by the time the server sees it; gating on that would make
  // this condition always false and silently skip every notification.
  const isNewPhoneCapture = Boolean(extracted.phone);

  const ai = getGeminiClient();

  if (ai) {
    try {
      const contents = buildGeminiContents(message, history, mergedLead);

      const RESPONSE_SCHEMA = {
        type: 'OBJECT',
        properties: {
          reply: { type: 'STRING' },
          suggestedPrompts: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            minItems: 3,
            maxItems: 3
          },
          showWhatsAppCta: { type: 'BOOLEAN' }
        },
        required: ['reply', 'suggestedPrompts', 'showWhatsAppCta']
      };

      // 12-second timeout for Gemini 3.6
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), 12000);
      });

      type StructuredReply = { reply: string; suggestedPrompts: string[]; showWhatsAppCta: boolean };

      const aiPromise = (async (): Promise<StructuredReply | null> => {
        // Try gemini-3.1-flash-lite first (fastest, ultra-responsive, smart)
        for (const modelName of ['gemini-3.1-flash-lite', 'gemini-3.6-flash']) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION + JSON_OUTPUT_SUFFIX,
                temperature: 0.4,
                maxOutputTokens: 700,
                responseMimeType: 'application/json',
                responseSchema: RESPONSE_SCHEMA
              }
            });
            if (response.text && response.text.trim().length > 5) {
              const parsed = JSON.parse(response.text.trim());
              if (parsed?.reply && typeof parsed.reply === 'string' && parsed.reply.trim().length > 15) {
                return {
                  reply: parsed.reply.trim(),
                  suggestedPrompts: Array.isArray(parsed.suggestedPrompts) ? parsed.suggestedPrompts.slice(0, 3) : [],
                  showWhatsAppCta: Boolean(parsed.showWhatsAppCta)
                };
              }
            }
          } catch (err: any) {
            console.warn(`Model ${modelName} error:`, err?.message);
          }
        }
        return null;
      })();

      const result = await Promise.race([aiPromise, timeoutPromise]);
      if (result) {
        try {
          upsertLeadRow(mergedLead, message);
        } catch (logErr) {
          console.warn('Lead logging failed:', logErr);
        }
        if (isNewPhoneCapture) {
          notifyNewLead(mergedLead, message).catch((err) => console.warn('Lead notify failed:', err?.message));
        }
        return res.json({
          reply: result.reply,
          leadUpdate: extracted,
          suggestedPrompts: result.suggestedPrompts,
          showWhatsAppCta: result.showWhatsAppCta || Boolean(mergedLead.phone)
        });
      }
    } catch (e) {
      console.warn('AI fallback triggered:', e);
    }
  }

  // Fast, accurate, civil engineering rule engine fallback
  const fallback = getSmartBotReply(message, mergedLead, (history?.length || 0) + 1);
  const fallbackLead: LeadInfo = { ...mergedLead, ...fallback.leadUpdate };
  try {
    upsertLeadRow(fallbackLead, message);
  } catch (logErr) {
    console.warn('Lead logging failed:', logErr);
  }
  if (isNewPhoneCapture) {
    notifyNewLead(fallbackLead, message).catch((err) => console.warn('Lead notify failed:', err?.message));
  }
  return res.json({
    reply: fallback.reply,
    leadUpdate: { ...extracted, ...fallback.leadUpdate },
    suggestedPrompts: fallback.suggestedPrompts,
    showWhatsAppCta: fallback.showWhatsAppCta
  });
});

// Small, fast follow-up call — asks Gemini for just the 3 suggested prompts
// + WhatsApp CTA flag, given the reply text that was already streamed out.
// Kept separate from the streamed reply because JSON mode and token
// streaming are mutually exclusive in one call.
async function getFollowUpMeta(
  ai: GoogleGenAI,
  userMessage: string,
  botReply: string,
  mergedLead: LeadInfo
): Promise<{ suggestedPrompts: string[]; showWhatsAppCta: boolean }> {
  const FOLLOWUP_SCHEMA = {
    type: 'OBJECT',
    properties: {
      suggestedPrompts: { type: 'ARRAY', items: { type: 'STRING' }, minItems: 3, maxItems: 3 },
      showWhatsAppCta: { type: 'BOOLEAN' }
    },
    required: ['suggestedPrompts', 'showWhatsAppCta']
  };
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `User asked: "${userMessage}"\nAssistant replied: "${botReply}"\n\nGive 3 short natural follow-up questions (in the user's own language/script) that continue this exact conversation, and whether a WhatsApp CTA should show now (true only if the user mentioned contact/WhatsApp/site-visit/engineer, or a phone number was just captured).`
          }]
        }
      ],
      config: {
        temperature: 0.4,
        maxOutputTokens: 200,
        responseMimeType: 'application/json',
        responseSchema: FOLLOWUP_SCHEMA
      }
    });
    const parsed = JSON.parse((response.text || '{}').trim());
    return {
      suggestedPrompts: Array.isArray(parsed.suggestedPrompts) ? parsed.suggestedPrompts.slice(0, 3) : [],
      showWhatsAppCta: Boolean(parsed.showWhatsAppCta) || Boolean(mergedLead.phone)
    };
  } catch (err: any) {
    console.warn('Follow-up meta generation failed:', err?.message);
    return { suggestedPrompts: [], showWhatsAppCta: Boolean(mergedLead.phone) };
  }
}

// Streaming Chat Endpoint (Server-Sent Events) — types the reply out
// word-by-word for a live "typing" feel, then sends suggested prompts
// and the WhatsApp CTA flag as a final event once the reply is complete.
app.post('/api/chat/stream', async (req, res) => {
  const { message, history, lead } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const currentLead: LeadInfo = lead || {
    name: null,
    phone: null,
    area: null,
    location: null,
    packagePreference: null,
    specificInterests: []
  };
  const extracted = extractLeadDetails(message, currentLead);
  const mergedLead: LeadInfo = { ...currentLead, ...extracted };
  // See the matching comment in /api/chat above — must key off extracted.phone,
  // not currentLead.phone, since the frontend sends an already-merged lead.
  const isNewPhoneCapture = Boolean(extracted.phone);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const sendEvent = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const ai = getGeminiClient();

  if (ai) {
    try {
      const contents = buildGeminiContents(message, history, mergedLead);
      let fullReply = '';

      for (const modelName of ['gemini-3.1-flash-lite', 'gemini-3.6-flash']) {
        try {
          fullReply = '';
          const stream = await ai.models.generateContentStream({
            model: modelName,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.4,
              maxOutputTokens: 500
              // Plain text here (no responseSchema) — JSON mode buffers the
              // whole response before returning anything, which defeats streaming.
            }
          });

          for await (const chunk of stream) {
            const piece = chunk.text;
            if (piece) {
              fullReply += piece;
              sendEvent('chunk', { text: piece });
            }
          }

          if (fullReply.trim().length > 10) break;
        } catch (err: any) {
          console.warn(`Stream model ${modelName} error:`, err?.message);
          fullReply = '';
        }
      }

      if (fullReply.trim().length > 10) {
        try {
          upsertLeadRow(mergedLead, message);
        } catch (logErr) {
          console.warn('Lead logging failed:', logErr);
        }
        if (isNewPhoneCapture) {
          notifyNewLead(mergedLead, message).catch((err) => console.warn('Lead notify failed:', err?.message));
        }

        const meta = await getFollowUpMeta(ai, message, fullReply, mergedLead);
        sendEvent('done', { leadUpdate: extracted, ...meta });
        return res.end();
      }
    } catch (e) {
      console.warn('Streaming AI failed, using fallback:', e);
    }
  }

  // Fallback: rule engine has no token-level stream, so send its reply as
  // one chunk — the frontend's typing animation covers the rest of the feel.
  const fallback = getSmartBotReply(message, mergedLead, (history?.length || 0) + 1);
  const fallbackLead: LeadInfo = { ...mergedLead, ...fallback.leadUpdate };
  try {
    upsertLeadRow(fallbackLead, message);
  } catch (logErr) {
    console.warn('Lead logging failed:', logErr);
  }
  if (isNewPhoneCapture) {
    notifyNewLead(fallbackLead, message).catch((err) => console.warn('Lead notify failed:', err?.message));
  }
  sendEvent('chunk', { text: fallback.reply });
  sendEvent('done', {
    leadUpdate: { ...extracted, ...fallback.leadUpdate },
    suggestedPrompts: fallback.suggestedPrompts,
    showWhatsAppCta: fallback.showWhatsAppCta
  });
  return res.end();
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
