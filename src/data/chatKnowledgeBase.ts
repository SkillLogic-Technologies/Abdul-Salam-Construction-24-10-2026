export interface LeadInfo {
  name: string | null;
  phone: string | null;
  area: number | null; // in sq.ft
  dimensions?: string | null; // e.g. "30x35"
  location: string | null;
  packagePreference: 'hall' | 'standard' | 'premium' | null;
  specificInterests: string[];
}

export interface BotResponse {
  reply: string;
  leadUpdate?: Partial<LeadInfo>;
  suggestedPrompts?: string[];
  showWhatsAppCta?: boolean;
}

export const WHATSAPP_NUMBER = '918318943040';
export const DISPLAY_PHONE = '83189 43040';

// Entity Extraction
export function extractLeadDetails(text: string, currentLead: LeadInfo): Partial<LeadInfo> {
  const updates: Partial<LeadInfo> = {};
  const lower = text.toLowerCase();

  // 1. Phone number (10-digit Indian mobile number)
  const phoneMatch = text.match(/(?:\+?91[\s-]?)?([6-9]\d{9})\b/);
  if (phoneMatch && phoneMatch[1]) {
    updates.phone = phoneMatch[1];
  }

  // 2. Plot Dimensions (e.g., 30x35, 30*35, 30 by 35, 20x40, 25x50, 30/40, 15x50)
  const dimMatch = text.match(/(\d{2,3})\s*(?:x|\*|by|\/|\s*into\s*)\s*(\d{2,3})/i);
  if (dimMatch && dimMatch[1] && dimMatch[2]) {
    const dim1 = parseInt(dimMatch[1], 10);
    const dim2 = parseInt(dimMatch[2], 10);
    const calculatedArea = dim1 * dim2;
    if (calculatedArea >= 250 && calculatedArea <= 40000) {
      updates.area = calculatedArea;
      updates.dimensions = `${dim1}×${dim2}`;
    }
  }

  // 3. Gaj measurement (e.g. 100 gaj, 150 gaj, 200 gaj)
  const gajMatch = text.match(/(\d{2,4})\s*gaj\b/i);
  if (gajMatch && gajMatch[1]) {
    const gajVal = parseInt(gajMatch[1], 10);
    updates.area = gajVal * 9; // 1 gaj = 9 sq.ft
    updates.dimensions = `${gajVal} Gaj (${gajVal * 9} sqft)`;
  }

  // 4. Built-up Area in Sqft (e.g., 1000 sqft, 1200 sq ft, 1500 varg fit, 2000 square feet)
  if (!updates.area) {
    const areaMatch = text.match(/(\d{3,5})\s*(?:sq\s*ft|sqft|varg\s*fit|square\s*feet|sq\s*meter|fit)?/i);
    if (areaMatch && areaMatch[1]) {
      const num = parseInt(areaMatch[1], 10);
      if (num >= 300 && num <= 30000 && !phoneMatch?.[0]?.includes(areaMatch[1])) {
        updates.area = num;
      }
    }
  }

  // 3. Location extraction (Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj towns and localities)
  const knownLocations = [
    'bhadohi', 'gyanpur', 'gopiganj', 'aurai', 'suriyawan', 'khamaria',
    'rajpura', 'maryadpatti', 'chauri', 'varanasi', 'prayagraj', 'mirzapur', 'jaunpur',
    'nai bazar', 'station road', 'civil lines', 'babhnan', 'aboli'
  ];
  for (const loc of knownLocations) {
    if (lower.includes(loc)) {
      updates.location = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  // 4. Package Preference
  if (lower.includes('hall') || lower.includes('1500') || lower.includes('open-span')) {
    updates.packagePreference = 'hall';
  } else if (lower.includes('premium') || lower.includes('luxury') || lower.includes('2250') || lower.includes('pop')) {
    updates.packagePreference = 'premium';
  } else if (lower.includes('standard') || lower.includes('1850') || lower.includes('regular') || lower.includes('normal')) {
    updates.packagePreference = 'standard';
  }

  // 5. Name extraction (e.g., "Mera naam Rahul hai", "Name is Amit", "I am Suresh")
  const nameMatch = text.match(/(?:mera naam|my name is|i am|naam)\s+([A-Za-z]{2,25})/i);
  if (nameMatch && nameMatch[1]) {
    const extracted = nameMatch[1].trim();
    const disallowedWords = ['mera', 'naam', 'house', 'construction', 'plot', 'bhaiya', 'sir', 'yes', 'no', 'need'];
    if (!disallowedWords.includes(extracted.toLowerCase())) {
      updates.name = extracted.charAt(0).toUpperCase() + extracted.slice(1);
    }
  }

  return updates;
}

// Generate WhatsApp link with prefilled inquiry message
export function generateWhatsAppLink(lead: LeadInfo, recentQuery?: string): string {
  const lines: string[] = [
    '🏗️ *Website Chat Support Inquiry - Abdul Salam Constructions*',
    ''
  ];

  if (lead.name) lines.push(`👤 *Client Name:* ${lead.name}`);
  if (lead.phone) lines.push(`📞 *Client Mobile:* ${lead.phone}`);
  if (lead.location) lines.push(`📍 *Construction Site:* ${lead.location}, Purwanchal Region`);
  if (lead.area) lines.push(`📐 *Plot / Slab Area:* ${lead.area} Sq.Ft`);
  if (lead.packagePreference) {
    const pkgLabels = {
      hall: 'Residential Hall (₹1,500/sq.ft)',
      standard: 'Standard Residential (₹1,850/sq.ft)',
      premium: 'Premium Residential (₹2,250/sq.ft)'
    };
    lines.push(`📦 *Selected Package:* ${pkgLabels[lead.packagePreference]}`);
  }
  if (recentQuery) {
    lines.push(`💬 *Customer Question/Notes:* ${recentQuery.slice(0, 150)}`);
  }

  lines.push('');
  lines.push('Assalam-o-Alaikum / Namaste Engineer Sahab, kripya BOQ quotation aur site inspection schedule discuss karein.');

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// Construction Calculation Helpers
function formatCost(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Crore`;
  }
  return `₹${(amount / 100000).toFixed(2)} Lakhs (₹${amount.toLocaleString('en-IN')})`;
}

// Comprehensive Knowledge Base Engine
export function getSmartBotReply(
  userText: string,
  lead: LeadInfo,
  messageHistoryCount: number
): BotResponse {
  const lower = userText.toLowerCase().trim();
  const leadUpdate = extractLeadDetails(userText, lead);
  const updatedLead: LeadInfo = { ...lead, ...leadUpdate };

  // Helper to append natural lead-progression prompt
  const appendNaturalNextStep = (mainReply: string): { reply: string; showCta?: boolean } => {
    // If we have full lead (name + phone or phone), give direct WhatsApp handoff
    if (updatedLead.phone) {
      return {
        reply: `${mainReply}\n\n✅ *Aapki details note kar li hain.* Hamari team jald sampark karegi. Aap chahein toh turant niche click karke WhatsApp par bhi connect ho sakte hain!`,
        showCta: true
      };
    }

    // Step-by-step polite lead collection (never ask everything at once)
    if (!updatedLead.area && !mainReply.includes('sqft') && !mainReply.includes('square feet')) {
      return {
        reply: `${mainReply}\n\n💡 *Aapka plot kitne square feet (sq.ft) ka hai?* Taaki main aapko exact cement, saria aur total budget calculate karke bata sakoon.`
      };
    }

    if (!updatedLead.location) {
      return {
        reply: `${mainReply}\n\n📍 *Aapka project kis area me hai?* (Jaise Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj, ya Gyanpur/Gopiganj/Aurai Road etc.)`
      };
    }

    if (!updatedLead.name) {
      return {
        reply: `${mainReply}\n\n👤 *Aapka shubh naam kya hai?* Taaki hamare site records me aapki inquiry register ho sake.`
      };
    }

    if (!updatedLead.phone) {
      return {
        reply: `${mainReply}\n\n📱 *Aapka WhatsApp / Mobile number kya hai?* Senior Civil Engineer aapko iska detailed BOQ quotation PDF aur 2D/3D floor plan WhatsApp par send kar denge.`
      };
    }

    return { reply: mainReply, showCta: true };
  };

  // 1. GREETING & GENERAL HELLO (INCLUDING TYPOS LIKE "namste", "namskar", "salaam", ETC.)
  if (/^(hi+|hey+|hello|namaste|namste|namaskar|namskar|pranam|salaam|salam|assalam|adaab|radhe|ram\s*ram|good\s*(morning|evening|afternoon)|jai\s*shree\s*ram)\b/i.test(lower)) {
    const greeting = `Namaste! Kaise hain aap? 🙏

Abdul Salam Constructions me aapka swagat hai. Batayein, naya ghar banwane ya renovation se juda aapka kya plan hai?`;
    return {
      reply: greeting,
      leadUpdate,
      suggestedPrompts: [
        '1500 sqft ka kharcha kitna aayega?',
        'Cement aur Saria kaun sa lagate ho?',
        'Payment ke 7 stages kya hain?',
        'Free site inspection book karo'
      ]
    };
  }

  // 1.1 CASUAL INQUIRY ("kaise ho", "kya haal hai", "how are you")
  if (/kaise ho|kese ho|kya haal|kya hal|how are you|sab theek|sab kaisa|aur bhai|aur batao/i.test(lower)) {
    const casualReply = `Main badhiya hoon, aapka bahut shukriya! 🙏

Aap batayein, sab theek? Ghar banwane ya plot construction ke baare me main aapki kya madad kar sakta hoon?`;
    return {
      reply: casualReply,
      leadUpdate,
      suggestedPrompts: [
        'Ghar banwane ka per sqft rate kya hai?',
        '1200 sqft me kitna kharcha aayega?',
        'Free site visit mil sakti hai?'
      ]
    };
  }

  // 1.12 BOT FEEDBACK & WITTY HANDLING ("smart nahi hai", "boring hai", "faltu", etc.)
  if (/smart n(ah)?i|boring|bekar|bakwas|robot|kya faida|ganda|smart answer|koi faida nahi/i.test(lower)) {
    const wittyReply = `Arrey bhai! Dil pe lag gayi yeh baat! 😅 Maafi chahta hoon agar main thoda textbook ya boring lag raha tha.

Ab bilkul brochure aur lambe lecture baazi band! Main Abdul Salam Constructions ka real civil engineer hoon — aap seedha, direct sawal poocho. Chahe:
• Saria aur cement ka aaj ka sachha market rate kya hai?
• Thekedaar log kaam me kahan chori ya dhandhli karte hain?
• Ya aapke plot par sach me sabse sasta aur mazboot ghar kaise ban sakta hai?

Aap batao, seedha kis mudde par baat karein?`;
    return {
      reply: wittyReply,
      leadUpdate,
      suggestedPrompts: [
        'Thekedaar kahan chori karte hain?',
        'Cement aur Saria kaun sa sabse best hai?',
        'Sabse sasta aur mazboot ghar kaise banega?',
        'WhatsApp par engineer se baat karein'
      ],
      showWhatsAppCta: true
    };
  }

  // 1.15 EMPATHY & LOW BUDGET / AFFORDABLE HOUSING / "MAI GAREEB HU"
  // Handles users saying: "mai gareeb hu", "paisa kam hai", "kam budget hai", "sasta ghar", "itna paisa nahi", etc.
  const expressesLowBudget = /gareeb|kam budget|paisa kam|paise kam|paise nahi|paisa nahi|itna paisa nahi|kam paise|budget tight|sasta|affordable|kam kharch|kam karcha|majboor|middle class/i.test(lower);
  if (expressesLowBudget) {
    const area = updatedLead.area;
    const dimText = updatedLead.dimensions ? ` (${updatedLead.dimensions} feet)` : '';

    const lowBudgetReply = `Bhai, aap bilkul pareshan mat hoiye! Dil chhota mat kijiye. 🙏 Ek imaandaar civil engineer ke taur par main aapko bilkul sach aur practical raasta batata hoon.

Ghar banana har parivaar ka sabse bada sapna hota hai, aur zaroori nahi ki shuru me hi poori zameen${dimText} par ek sath lakho rupaye lagaye jayein. Hamare yahan hum **Low-Cost Smart Civil Engineering** aur **Tukdo Me Nirmaan (Phased Construction)** ka raasta apnate hain:

1️⃣ **Pehle Sirf Zaroori Hissa Banwayein (Phased Work):**
   Agar aapke pass 2,000 sq.ft ya bada plot hai, toh abhi poori zameen par chhat dhalne ki zaroorat nahi hai. Abhi sirf **400 se 600 sq.ft** me 1-2 kamre, ek kitchen aur ek toilet banwa lijiye (yeh lagbhag **₹5 se ₹7 Lakh** me mazboot chhat ke sath rehne layak ban jata hai). Baaki zameen khuli aangan/khet ke taur par safe rahegi.

2️⃣ **Pillars & Neenv Mazboot Rakhein (Future Scope):**
   Hum neenv aur RCC pillars ka structure standard banayenge, taaki kal ko jab bhi aapke pass paise jama hon, toh bina kuch tode aage ke kamre ya upar ki chhat aasaani se jodi ja sake.

3️⃣ **Dikhawe Ke Kharchon Ki Bachat (Save 25-30%):**
   Shuru me fancy tiles, false ceiling ya mehnge show items ki jagah smooth cement flooring aur simple paint rakhein. Isse construction quality me koi samjhauta kiye bina laakhon rupaye bach jate hain.

4️⃣ **Transparent Local Team:**
   Abdul Salam Constructions Bhadohi, Mirzapur, Jaunpur, Varanasi aur Prayagraj me direct karigaron aur transparent material procurement ke sath kaam karti hai — koi beech ka thekedaari commission nahi.

Aap khulkar batayein, abhi aapke pass lagbhag **kitna budget (jaise ₹3 Lakh, ₹5 Lakh ya ₹7 Lakh)** aasaani se ban payega? Hum usi ke andar aapke sar par ek pakki aur mazboot chhat plan kar denge.`;

    return {
      reply: lowBudgetReply,
      leadUpdate,
      suggestedPrompts: [
        '5 Lakh me kitna ghar ban sakta hai?',
        'Kam kharche me naksha kaisa banega?',
        'WhatsApp par engineer se baat karein',
        'Material me kharcha kaise bachayein?'
      ],
      showWhatsAppCta: true
    };
  }

  // 1.18 ROOMS BREAKDOWN / "KITNE ROOM NIKLENGE" / ROOM PLANNING
  const asksRoomCount = /kitne room|kitna room|kitne kamre|kitna kamra|room niklenge|room banenge|room banega|kitne bedroom|kamra banega|kya kya ban sakta|room layout|bhk niklega/i.test(lower);
  if (asksRoomCount) {
    const area = updatedLead.area || 1050;
    const dims = updatedLead.dimensions || (area === 2000 ? '50×40' : '30×35');

    let roomAnalysis = '';
    if (area >= 1800) {
      roomAnalysis = `Aapka **${dims} feet (${area} Sq.Ft)** ka plot kaafi bada aur shandar hai! 

Is plot size me Ground Floor par hi behad aasaani se ek **bada 4 BHK ya luxurious 3 BHK + Car Porch** nikal jayega:

🏡 **Option 1: Grand 4 BHK Plan (Joint / Badi Family ke liye)**
• **1 Master Bedroom (14×15 ft)** — Attached modern toilet & dressing space ke sath
• **2 Family Bedrooms (12×14 ft)** — Havadar aur roshni dar
• **1 Guest Room / Drawing Hall (16×18 ft)** — Front side me taaki mehmaan direct enter kar sakein
• **1 Central Living / Dining Area (14×20 ft)** — Family ke sath baithne ke liye
• **1 Modular Kitchen (10×10 ft)** — Utility / wash area ke sath
• **1 Dedicated Pooja Room + 1 Common Toilet**
• **Front Porch & Car Parking (12×16 ft)** — Saath me aage chhota garden/lawn

🏢 **Option 2: 2 Separate Units (Khud Rehne + Rent Par Dene ke liye)**
• Ground Floor par **2 BHK ke 2 alag-alag portions** nikal sakte hain. Ek me aap khud rahein, aur doosra portion rent par de kar har mahine aamdani shuru kar sakte hain!

Aap batayein, aapko ek bada single ghar (Bungalow style) chahiye ya aage chal kar rent/kiraaye ke hisab se planning karni hai? Hamare Senior Engineer aapke plot orientation ke hisab se exact 2D Layout draw karke bhej denge.`;
    } else if (area >= 1200) {
      roomAnalysis = `Aapke **${dims} feet (${area} Sq.Ft)** ke plot me Ground Floor par aasaani se **3 BHK (3 Bedrooms, Hall, Kitchen) + Front Porch** nikalta hai:

• **1 Drawing Room (12×16 ft)** — Front entrance par
• **1 Master Bedroom (12×14 ft)** — Attached bathroom ke sath
• **2 Bedrooms (11×13 ft)** — Cross-ventilation ke sath
• **1 Kitchen (8×10 ft)** — Vastu compliant (Aagneya/South-East)
• **1 Dining Space + 1 Common Washroom**
• **Front Car / Bike Parking Porch (10×14 ft)**

Isme poora ghar havadar aur roshni se bharpoor plan ho jata hai.`;
    } else {
      roomAnalysis = `Aapke **${dims} feet (${area} Sq.Ft)** ke plot me bahut hi smart layout se **2 BHK ya 3 BHK** nikalta hai:

• **2 Bedrooms (11×12 ft)** — Master & Kids/Guest room
• **1 Drawing / Living Hall (12×14 ft)**
• **1 Open Modular Kitchen (8×8 ft)**
• **1 Common Bathroom + 1 Small Utility/Wash area**
• **Front Parking / Verandah (8×12 ft)**`;
    }

    return {
      reply: roomAnalysis,
      leadUpdate,
      suggestedPrompts: [
        `${dims} ka 2D naksha kaisa banega?`,
        'Payment ke 7 stages kya hain?',
        'Standard package me kya kya saman milta hai?',
        'WhatsApp par Engineer se baat karein'
      ],
      showWhatsAppCta: true
    };
  }

  // 1.2 PLOT / LAND / DIMENSION HOUSE CONSTRUCTION CONSULTATION
  // (e.g. "mere pass 30X35 ka jameen hai aur uspe ghar banwana hai kaise bane ga", "ghar kaise banega", "plot par ghar banana hai")
  const mentionsLandOrPlot = /jameen|zameen|plot|land|khet|jagah|space/i.test(lower);
  const asksHowOrBuild = /ghar banwana|ghar banana|kaise bane|kaise banega|process|naksha|layout|banwana chahta|banwana hai|kaise banta|steps/i.test(lower);
  const currentMsgHasDimensions = Boolean(leadUpdate.dimensions);

  if ((mentionsLandOrPlot && asksHowOrBuild) || currentMsgHasDimensions) {
    const area = updatedLead.area || 1050;
    const dimStr = updatedLead.dimensions ? `**${updatedLead.dimensions} feet** (lagbhag **${area} Sq.Ft**)` : `lagbhag **${area} Sq.Ft**`;
    const stdCost = formatCost(area * 1850);
    const hallCost = formatCost(area * 1500);
    const premCost = formatCost(area * 2250);

    const roomType = area >= 1800 ? 'shandar 4 BHK ya 3 BHK villa (front porch aur lawn ke sath)' : area >= 1200 ? 'havadar 3 BHK ghar' : '2 BHK ya 3 BHK ghar';

    const roadmapReply = `Aapka plot ${dimStr} ka hai! Is plot size me ek behad shandar, havadar aur mazboot **${roomType}** aasaani se plan ho jata hai.

Ghar banwane ka step-by-step civil engineering process is tarah rahega:

1️⃣ **Planning & 2D Naksha:** 
   Pehle plot orientation (Purab/Uttar/Vastu) ke hisab se bedrooms, open modular kitchen, drawing hall aur staircase ka 2D Layout taiyar hota hai.

2️⃣ **Foundation & Neenv (PCC + Plinth Beam):** 
   Plot ki mitti ke hisab se 4-5 feet excavation, PCC Bed (8:5:1 ratio) aur heavy Plinth Tie-Beam dhalega taaki deewaron me kabhi crack na aaye.

3️⃣ **RCC Columns & Structure:** 
   Tata/Jindal Fe 550D TMT Saria aur M20 concrete (3:2:1 ratio) se earthquake-resistant pillars khade honge.

4️⃣ **9" Red Brick Masonry (Jodai):** 
   1st Class Awwal Kiln Red Bricks aur 6:1 cement morang mortar ke sath walls taiyar hongi.

5️⃣ **Chhat Dhalai (Roof Casting):** 
   UltraTech Weather Plus / ACC Gold cement se 4.5" to 5" thick slab casting aur continuous 14-day water curing.

6️⃣ **Finishing & Turnkey Handover:** 
   Concealed Polycab wiring, Astral plumbing, Kajaria tiles aur Jaquar sanitary fittings ke sath complete ready-to-move key handover!

💰 **${area} Sq.Ft ka Complete Turnkey Estimate:**
• **Standard Package (Sabse Popular):** ${stdCost} (+ 18% GST)
• **Residential Hall:** ${hallCost} (+ 18% GST)
• **Premium Villa (POP Ceilings):** ${premCost} (+ 18% GST)

Aapka yeh plot kis area me hai — Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj (jaise Gyanpur, Gopiganj, Aurai Road, Suriyawan, etc.)? Hamare Senior Site Engineer free inspection ke liye plot ka exact level check karke aapko customized 2D Floor Plan layout bhej denge.`;

    return {
      reply: roadmapReply,
      leadUpdate,
      suggestedPrompts: [
        `${updatedLead.dimensions || '50x40'} me kitne room niklenge?`,
        'Payment ke 7 stages kya hain?',
        'Kitne mahine me ghar taiyar hoga?',
        'WhatsApp par Engineer se baat karein'
      ],
      showWhatsAppCta: true
    };
  }

  // 2. SPECIFIC COST CALCULATION IF AREA DETECTED OR ASKED
  const hasAreaMention = updatedLead.area || /(\d{3,5})\s*(?:sqft|sq\s*ft)/.test(lower);
  const asksCost = /cost|kharch|rate|budget|price|kitna lagega|paisa|estimate|karcha/i.test(lower);

  if (asksCost && hasAreaMention) {
    const area = updatedLead.area || 1200;
    const hallCost = area * 1500;
    const stdCost = area * 1850;
    const premCost = area * 2250;

    const cementBags = Math.round(area * 0.42);
    const steelTons = (area * 0.0038).toFixed(1);

    const costBreakdown = `📊 **${area} Sq.Ft Roof Slab Area ka Complete Cost Estimate:**

1️⃣ **Residential Hall (₹1,500/sq.ft):**
   • Base: ${formatCost(hallCost)} (+ 18% GST)
   • Ideal for open hall / base floor layout. Cera fittings, 2x2 vitrified tiles.

2️⃣ **Standard Residential (₹1,850/sq.ft) - ⭐ Sabse Popular:**
   • Base: ${formatCost(stdCost)} (+ 18% GST)
   • Turnkey Ghar: UltraTech/ACC cement, Fe 550D TMT, Jaquar bath fittings, marble in dining, granite kitchen.

3️⃣ **Premium Residential (₹2,250/sq.ft):**
   • Base: ${formatCost(premCost)} (+ 18% GST)
   • Luxury Villa finish: Designer POP False Ceilings, premium sanitary suites, full wooden flush doors with Godrej locks.

🔩 **Rough Material Consumption:**
• Cement: Lagbhag ~${cementBags} Bags (UltraTech / ACC)
• Fe 550D TMT Saria: Lagbhag ~${steelTons} Tons`;

    const res = appendNaturalNextStep(costBreakdown);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Payment stages kya hain?', 'Cement aur saria kaun sa hai?', 'Kya ground floor me extra lagta hai?'],
      showWhatsAppCta: res.showCta || true
    };
  }

  // 3. GENERAL RATES / PACKAGES (WITHOUT SPECIFIC AREA)
  if (/rates|package|pricing|rate list|per sqft|square feet rate|kharcha kya hai|rate kya chal raha/i.test(lower)) {
    const packageInfo = `📋 **Abdul Salam Constructions ke Official Quotation Rates:**

• 🏛️ **Residential Hall:** ₹1,500 / sq.ft (+ 18% GST)
• 🏡 **Standard Residential:** ₹1,850 / sq.ft (+ 18% GST) — *Sabse zyada pasand kiya jane wala turnkey package.*
• 🏰 **Premium Residential:** ₹2,250 / sq.ft (+ 18% GST) — *Designer POP Ceilings aur Luxury fittings ke sath.*

✨ **Sabhi packages me included:**
• Certified UltraTech / ACC Cement
• Fe 550D TMT Rebar (Tata / Jindal / Kamdhenu)
• 1st Class Awwal Kiln Red Bricks
• 7-Stage Civil Verified Milestones (Koi advance risk nahi)
• 1 Saal tak Zero Price Escalation Guarantee`;

    const res = appendNaturalNextStep(packageInfo);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['1200 sqft me kitna lagega?', '1500 sqft ka estimate do', 'Payment kaise deni hoti hai?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 4. CEMENT BRAND & QUALITY
  if (/cement|ultratech|acc|ambuja|jk lakshmi|birla|cement quality/i.test(lower)) {
    const cementReply = `🧱 **Cement Standards & Specifications:**

Hum sirf top-tier branded cement use karte hain:
• **UltraTech Weather Plus** ya **ACC Gold / Suraksha**
• **Packaging:** Factory fresh, 'Not for Sale' industrial packaging aati hai jo directly authorized depot se test certificate ke sath uthati hai.
• **Storage:** Site par moisture-proof platform par rakha jata hai.
• Neenv (PCC) se lekar slab dhalai aur plastering tak grade ke mutabiq use hota hai.`;

    const res = appendNaturalNextStep(cementReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Saria kaun sa lagate ho?', 'Concrete mix ratio kya hai?', 'Chhat ki dhalai kaise hoti hai?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 5. STEEL / SARIA / TMT REBAR
  if (/saria|tmt|steel|iron|loha|tata|jindal|kamdhenu|fe 550|rebar/i.test(lower)) {
    const steelReply = `🔩 **Steel / Saria Grade & Brands:**

• **Grade:** High-ductility **Fe 550D TMT** (Earthquake-resistant grade).
• **Approved Brands:** Tata Tiscon, Jindal Panther, Kamdhenu, Captain ya certified equivalent.
• **Testing:** Har lot ka weight aur bending test site engineer verify karta hai.
• **Structural Safety:** IS 1786 and IS 13920 seismic detailing ke hisab se bandhai (binding wire) aur ring spacing follow hoti hai.`;

    const res = appendNaturalNextStep(steelReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Concrete mix ka ratio kya hota hai?', 'Neenv (Foundation) kaise banti hai?', '1200 sqft me kitna saria lagega?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 6. MORTAR RATIO & CONCRETE MIX (CIVIL ENGINEERING RATIOS)
  if (/ratio|mix|masala|concrete|gitty|balu|cement ratio|mortar|pcc|rcc/i.test(lower)) {
    const ratioReply = `📐 **Official Civil Engineering Mortar & Concrete Ratios:**

1. **PCC Bed (Neenv ki base):**
   • **Ratio 8:5:1** (8 parts 20/40mm gitty, 5 parts sand, 1 part cement).
2. **RCC Roof Slab, Columns & Beams:**
   • **Ratio 3:2:1** (3 parts blue metal aggregate 20+10mm, 2 parts clean morang/sand, 1 part cement).
3. **9" Exterior Wall Masonry (Jodai):**
   • **Ratio 6:1** (6 parts sand, 1 part cement).
4. **4.5" Partition Wall Masonry:**
   • **Ratio 5:1** (5 parts sand, 1 part cement with reinforcement wire).
5. **Plaster Work:**
   • External: 15mm double-coat (6:1) with waterproof chemical.
   • Internal: 10mm smooth sponge finish (6:1).
   • Ceiling: 7mm fine plaster (6:1).
   • **Curing:** Minimum 10 se 14 din continuous water ponding/curing.`;

    const res = appendNaturalNextStep(ratioReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Bricks kaun si use hoti hain?', 'Slab dhalai me kitna waqt lagta hai?', 'Payment milestones kya hain?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 7. BRICKS (EENT)
  if (/brick|eent|eet|int|red brick|flyash|awwal/i.test(lower)) {
    const brickReply = `🧱 **Bricks (Eent) Specification:**

• Hum sirf **1st Class Kiln-burned Awwal Red Clay Bricks** use karte hain.
• Pure red color, sharp edges, metallic ringing sound jab do eent takrayi jayein, aur uniform shape.
• 24-ghante paani me bhigone par 20% se kam water absorption hota hai. Kacchi ya pilli eent site par allow nahi hoti.`;

    const res = appendNaturalNextStep(brickReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Deewar me cement kitna lagega?', 'Foundation work kaise hota hai?', 'Rates kya hain?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 8. 7 PAYMENT MILESTONES (STAGES)
  if (/payment|milestone|stage|kist|installment|advance|paisa kab dena hai|terms/i.test(lower)) {
    const paymentReply = `💰 **7-Stage Verified Payment Schedule (100% Transparency):**

Aapko saare paise ek sath nahi dene hote, kaam pass hone par hi kist aati hai:

1. **Stage 1 (20%):** Booking & Contract Agreement Signing.
2. **Stage 2 (10%):** Plinth Level pass hone par (Excavation, PCC, Footings & Tie-beams).
3. **Stage 3 (15%):** Ground Column casting till beam bottom.
4. **Stage 4 (10%):** Brick Masonry (Jodai) of respective floor.
5. **Stage 5 (20%):** RCC Roof Slab Casting (Chhat Dhalai).
6. **Stage 6 (5%):** Internal & External Plaster work.
7. **Stage 7 (20%):** Finishing (Flooring, Painting, Sanitary fittings & Key Handover).

Is schedule se customer ke paise 100% safe rehte hain!`;

    const res = appendNaturalNextStep(paymentReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Kya ground floor pe 25% extra lagta hai?', 'Duration kitna lagega?', 'Site inspection book karo'],
      showWhatsAppCta: res.showCta
    };
  }

  // 9. ELECTRICAL SPECIFICATIONS
  if (/electric|wire|switch|conduit|wiring|bijli|board|mcb|havells|polycab/i.test(lower)) {
    const electricReply = `⚡ **Electrical & Concealed Wiring Specifications:**

• **Wiring:** Heavy-duty FRLS (Fire Retardant Low Smoke) copper wire — RR Kabel / Havells / Polycab.
• **Conduits:** Heavy PVC roof conduits (₹70-75/m) & medium PVC wall conduits (₹45-50/m).
• **Modular Switches:** Anchor Roma / GreatWhite modular switches with metal back-boxes.
• **Provisions:** Har room me adequate light, fan points, TV point aur AC heavy power plug provision.
• *Note:* Decorative chandeliers, wall fans, tube lights aur external earthing/main panel meter supply scope se bahar hote hain.`;

    const res = appendNaturalNextStep(electricReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Plumbing me kaun sa pipe lagate ho?', 'Flooring me kya milega?', 'Standard package me kya kya hai?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 10. PLUMBING, SANITARY & WATER TANK
  if (/plumb|pipe|tank|bathroom|toilet|sanitary|jaquar|cera|astral|supreme|sintex| नल |नल|paani/i.test(lower)) {
    const plumbReply = `🚿 **Plumbing, Water & Sanitary Specifications:**

• **Concealed Pipes:** Astral / Supreme CPVC (hot & cold) aur UPVC heavy pressure lines.
• **Drainage/Sewer:** 4" aur 5" heavy PVC pipes (5-6 kg pressure) inspection chamber ke sath.
• **Sanitaryware:**
  - Standard Package: Cera / Jaquar Wall-hung toilet, wash basin, Chrome plated Jaquar taps.
  - Premium Package: Jaquar Luxury suite with concealed diverters and vanity basin.
• **Overhead Tank:** 500 Litre (Standard) / 1000 Litre (Premium) Sintex 4-layer PU insulated tank.
• *Note:* Deep borewell drilling aur submersible pump customer ka scope hota hai, hum internal connection complete karte hain.`;

    const res = appendNaturalNextStep(plumbReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Tiles aur marble ka rate kya hai?', 'Borewell shamil hai ya nahi?', 'Estimate calculate karo'],
      showWhatsAppCta: res.showCta
    };
  }

  // 11. FLOORING, TILES & MARBLE
  if (/floor|tile|marble|granite|marbal|kajaria|vitrified|kitchen slab/i.test(lower)) {
    const floorReply = `🏛️ **Flooring, Tiles & Kitchen Finishes:**

• **Living & Bedrooms:** 2x2 ya 2x4 premium vitrified tiles (Kajaria, Vermora, ya Johnson).
• **Dining/Foyer (Standard & Premium):** Polished natural Indian marble (Green/Makrana/White blend).
• **Kitchen Platform:** Jet-Black Granite slab (18-20mm) with full round bull-nose molding + SS Sink with drainboard + 2-feet wall dados tiles.
• **Bathrooms:** Anti-skid floor tiles + 7-feet high digital glazed wall tiles.
• **Staircase:** Granite/Marble treads with anti-skid grooving and SS 304 railing.`;

    const res = appendNaturalNextStep(floorReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Doors aur windows kis brand ke hain?', 'POP False Ceiling kis me hai?', '1500 sqft ka kharcha batao'],
      showWhatsAppCta: res.showCta
    };
  }

  // 12. DOORS, WINDOWS & HARDWARE
  if (/door|window|khidki|darwaza|gate|godrej|upvc|flush door|chaukhat/i.test(lower)) {
    const doorReply = `🚪 **Doors, Windows & Fabrication:**

• **Chaukhat (Frames):** Seasoned hardwood (Mirzapur Sal / Malaysian Sal) with anti-termite primer.
• **Main Door:** 35mm thick designer flush door / teak finish with Godrej brass mortise lock.
• **Internal Doors:** 30mm water-resistant flush doors with branded cylindrical handles.
• **Windows:** Prominence UPVC 2/3-track sliding windows with 5mm Saint-Gobain float glass and SS mesh bug screen.
• **Main Entrance Gate:** Heavy fabricated Mild Steel (MS) gate (approx. 200-250 kg) with primer and 2 coats of enamel paint.`;

    const res = appendNaturalNextStep(doorReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['POP Ceiling kis package me hai?', 'Total kitna time lagta hai?', 'Site inspection schedule karo'],
      showWhatsAppCta: res.showCta
    };
  }

  // 13. POP CEILING / FALSE CEILING
  if (/pop|ceiling|false ceiling|fall ceiling|gypsum|designer ceiling/i.test(lower)) {
    const popReply = `✨ **POP False Ceiling Details:**

• **Premium Package (₹2,250/sq.ft):** Designer POP False Ceiling with cove lighting channels and cornices poori tarah se **INCLUDED** hai!
• **Standard (₹1,850/sq.ft) & Hall (₹1,500/sq.ft):** Standard me normal smooth ceiling plaster rehta hai. Agar alag se POP karwani ho toh actual measurement ke hisab se rate add ho sakta hai.`;

    const res = appendNaturalNextStep(popReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Standard aur Premium me kya fark hai?', '1200 sqft me kitna kharcha aayega?', 'Contact number kya hai?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 14. TIME / DURATION TO COMPLETE
  if (/time|duration|kitne din|kitne mahine|kitna waqt|kab tak|handover|speed/i.test(lower)) {
    const timeReply = `⏳ **Construction Duration & Timeline:**

• Normal **1,200 se 2,000 Sq.Ft** ka residential ghar complete hone me lagbhag **6 se 9 mahine** ka waqt lagta hai.
• Hum quality me jaldbazi nahi karte — har concrete casting ke baad 10-14 din proper curing (tarai) di jati hai taaki structural strength 100% achieve ho.
• Work agreement me fixed timeline mention hoti hai.`;

    const res = appendNaturalNextStep(timeReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Kaam shuru karne ke liye kya chahiye?', 'Site visit kab kar sakte hain?', 'Quotation rates kya hain?'],
      showWhatsAppCta: res.showCta
    };
  }

  // 15. SPECIAL MEASUREMENT RULES (STAIRS, DO-CHHATTI, GROUND FLOOR ONLY)
  if (/measurement|rule|stair|sidhi|chajja|do chhatti|double slab|extra charge|naap/i.test(lower)) {
    const measureReply = `📏 **Standard Measurement Guidelines (As per Quotation Agreement):**

1. **Horizontal Built-Up Roof Slab:** 100% calculation.
2. **Staircase (Sidhi):** 150% rate par measure hoti hai (kyunki steps casting, vertical shuttering aur steel reinforcement me do-guna labour lagti hai).
3. **Double Slab (Do-Chhatti / Loft):** 50% rate par.
4. **Single Floor Clause:** Agar sirf ground floor banta hai (bina first floor plan ke), toh foundation aur deep excavation cost adjust karne ke liye 25% extra cost apply hoti hai.`;

    const res = appendNaturalNextStep(measureReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['1500 sqft ka total estimate do', 'Payment kaise lenge?', 'Engineer se baat karni hai'],
      showWhatsAppCta: res.showCta
    };
  }

  // 16. EXCLUSIONS (TRANSPARENT CLARITY)
  if (/exclusion|extra kya hai|shamil nahi|kya nahi milega|hidden charge|borewell|boundary wall/i.test(lower)) {
    const exclusionReply = `🛡️ **Complete Transparency - What is Excluded from Turnkey Rates:**

Ghar ke internal construction ke alawa kuch cheezein owner ki scope me rehti hain:
• **Deep Borewell & Submersible Pump:** (Owner scope; internal piping humari scope hai).
• **Boundary Wall & External Gate Pillars:** (Separate running-feet basis pe calculate hota hai).
• **Electricity & Water during construction:** (Site par temporary electricity aur curing water owner provide karte hain).
• **Movable Furniture & Kitchen Woodwork/Chimney.**
• **Government Map Sanction fees (Nagar Palika/VDA).**

Iske alawa contract me diye gaye BOQ par **zero hidden cost** rehti hai!`;

    const res = appendNaturalNextStep(exclusionReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Standard package me kya shamil hai?', 'Rates kya hain?', 'Engineer se direct milna hai'],
      showWhatsAppCta: res.showCta
    };
  }

  // 17. SERVICE LOCATIONS & PHYSICAL OFFICE
  if (/kahan|location|address|office|service area|bhadohi|mirzapur|jaunpur|varanasi|prayagraj|purwanchal|gyanpur|gopiganj|aurai|suriyawan|kahan kaam karte/i.test(lower)) {
    const locReply = `📍 **Hamara Work Area & Registered Engineering Office:**

• **Core Service Areas:** Bhadohi, Mirzapur, Jaunpur, Varanasi, aur Prayagraj — including Bhadohi Town, Gyanpur, Gopiganj (NH-19), Aurai Road, Suriyawan, Khamaria, Chauri, aur poore Purwanchal region ke residential/commercial ilaqe.
• **Physical Site Office:** Phase-II, Rajpura Colony, Opp. H.P. Petrol Pump, Aurai Road, Bhadohi – 221401 (U.P.).
• **Site Inspection:** Agar aapka plot Bhadohi, Mirzapur, Jaunpur, Varanasi ya Prayagraj me hai, toh hamare Civil Engineer bina kisi charge ke site par aakar layout dekh sakte hain.`;

    const res = appendNaturalNextStep(locReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Site inspection schedule karo', 'Standard package rate kya hai?', 'WhatsApp pe quotation bhejo'],
      showWhatsAppCta: res.showCta
    };
  }

  // 18. FREE SITE INSPECTION / CONSULTATION REQUEST
  if (/site visit|inspection|aakar dekho|plot dekhna|milna hai|engineer aayega|meeting/i.test(lower)) {
    const visitReply = `👷‍♂️ **Free Site Inspection & Plot Consultation:**

Bilkul! Hamare Senior Civil Engineer aapke plot par aakar:
1. Plot dimensions aur soil condition check karenge.
2. Foundation depth aur road-level elevation discuss karenge.
3. Vastu aur light-ventilation ke according preliminary layout advise karenge.
4. Exact itemized BOQ estimate ready karke denge.`;

    const res = appendNaturalNextStep(visitReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Mera plot Bhadohi me hai', 'Apna contact number do', 'Rates kya hain?'],
      showWhatsAppCta: true
    };
  }

  // 19. WHY CHOOSE ABDUL SALAM CONSTRUCTIONS VS LOCAL THEKEDAR
  if (/thekedar|contractor|difference|kyun chune|bharosa|why asc|trust|local thekedar/i.test(lower)) {
    const whyReply = `🏆 **Kyun Abdul Salam Constructions (ASC) Local Thekedaron se Behtar Hai?**

1. **Itemized BOQ Contract:** Har ek eent, saria, cement ka brand likhit me hota hai — beech me koi rate badhane ka jhanjhat nahi.
2. **7-Stage Verified Milestones:** Kaam pass hone par hi agla paisa liya jata hai.
3. **Engineered Testing:** IS Code standard structural drawings aur proper concrete vibrator/curing.
4. **GST Registered Entity:** GSTIN 09EOZPS3260D1ZB ke sath legal accountability.
5. **No Material Theft/Leakage:** Material procure aur site management humari team handle karti hai, aap tension-free rehte hain.`;

    const res = appendNaturalNextStep(whyReply);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['Payment schedule kya hai?', '1500 sqft ka estimate kya aayega?', 'WhatsApp pe baat karein'],
      showWhatsAppCta: res.showCta
    };
  }

  // 20. DIRECT CONTACT / PHONE / WHATSAPP REQUEST
  if (/phone|contact|number|call|whatsapp|mobile|baat karni hai/i.test(lower)) {
    const contactReply = `📞 **Direct Contact Details:**

• **WhatsApp Helpline:** +91 ${DISPLAY_PHONE} (Instant Response)
• **Site Engineer Direct Call:** +91 70075 29965 / 94155 25965
• **Office Address:** Phase-II, Rajpura Colony, Opp. H.P. Petrol Pump, Aurai Road, Bhadohi.

Aap niche diye gaye button par click karke turant WhatsApp par directly chat shuru kar sakte hain!`;

    return {
      reply: contactReply,
      leadUpdate,
      suggestedPrompts: ['1200 sqft ka quotation chahiye', 'Free site visit book karo', 'Standard package specifications'],
      showWhatsAppCta: true
    };
  }

  // 21. CAPTURING NAME / LOCATION / PHONE IF GIVEN DIRECTLY
  if (leadUpdate.phone || (leadUpdate.name && !asksCost)) {
    let ack = '';
    if (leadUpdate.name && leadUpdate.phone) {
      ack = `Bahut dhanyawad **${leadUpdate.name} ji**! Aapka number (+91 ${leadUpdate.phone}) note ho gaya hai. Hamari team jald sampark karegi.`;
    } else if (leadUpdate.name) {
      ack = `Namaste **${leadUpdate.name} ji**! Aapka naam register ho gaya hai.`;
    } else if (leadUpdate.phone) {
      ack = `Aapka contact number (+91 ${leadUpdate.phone}) safe hai aur note ho gaya hai.`;
    }

    const res = appendNaturalNextStep(ack);
    return {
      reply: res.reply,
      leadUpdate,
      suggestedPrompts: ['WhatsApp par BOQ bhejo', '1500 sqft ka estimate calculate karo', 'Site inspection book karo'],
      showWhatsAppCta: true
    };
  }

  // 22. DEFAULT INTELLIGENT CONVERSATIONAL FALLBACK (NEVER DUMP SERVICES)
  const defaultReply = `Ji bilkul, batayein main aapki kya madad kar sakta hoon? 🙏

Aap mujhse ghar banwane ka rate, cement/saria material quality, 7-stage payment schedule, ya free site inspection ke baare me pooch sakte hain.`;

  return {
    reply: defaultReply,
    leadUpdate,
    suggestedPrompts: [
      '1500 sqft ka kharcha kitna aayega?',
      'Cement aur Saria kaun sa lagate ho?',
      'Payment schedule kaise kaam karta hai?',
      'Engineer se WhatsApp par baat karein'
    ],
    showWhatsAppCta: false
  };
}
