import {
  CompanyConfig,
  NavigationItem,
  Service,
  ConstructionPackage,
  PackageSpecificationSection,
  CivilWorkCategory,
  MaterialBrandSpecification,
  MeasurementRule,
  PaymentScheduleStage,
  QuotationClause,
  Project,
  Testimonial,
  FAQItem,
  ServiceArea
} from '../types';

export const COMPANY_DATA: CompanyConfig = {
  name: "M/S ABDUL SALAM CONSTUCTIONS COMPANY",
  brandName: "Abdul Salam Constructions (ASC)",
  tagline: "Engineering Quality Homes. Built With Integrity.",
  gstin: "09EOZPS3260D1ZB",
  address: {
    line1: "Phase-II, Rajpura Colony",
    line2: "Opposite H.P. Petrol Pump, Aurai Road",
    city: "Bhadohi",
    state: "Uttar Pradesh",
    pincode: "221401",
    country: "India",
    fullAddress: "Phase-II, Rajpura Colony, Bhadohi – 221401 (U.P.), India",
    landmark: "Phase-II, Rajpura Colony / Opposite H.P. Petrol Pump, Aurai Road"
  },
  contact: {
    phone: "+917007529965",
    phoneAlt: "+919415525965",
    projectHotline: "+919305215202",
    phoneDisplay: "+91 70075 29965 / 94155 25965",
    email: "contact@abdulconstruction.com",
    emailDisplay: "contact@abdulconstruction.com",
    whatsapp: "+918318943040",
    whatsappDisplay: "+91 83189 43040",
    website: "https://abdulconstruction.com/contact",
    officeHours: "Monday – Saturday: 9:00 AM – 7:30 PM (Site Engineering Office)"
  },
  socialLinks: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  }
};

export const PROMO_MESSAGES = [
  "M/S ABDUL SALAM CONSTRUCTIONS COMPANY (GSTIN: 09EOZPS3260D1ZB)",
  "Turnkey Rates: ₹1500 / ₹1850 / ₹2250 per SQFT + 18% GST",
  "Official Turnkey Specifications: UltraTech / ACC Gold, 550D TMT, Awwal Bricks",
  "Transparent 7-Stage Milestone Payment Schedule with Zero Hidden Costs",
  "Head Office: Phase-II, Rajpura Colony, Bhadohi (Mob: 7007529965, 9415525965)"
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export const TRUST_PILLARS = [
  {
    title: "Quality Materials",
    description: "Standardized cement grades, high-yield TMT steel, and kiln-burned first-class bricks sourced for long-term structural durability.",
    icon: "ShieldCheck"
  },
  {
    title: "Reliable Suppliers",
    description: "Consistent material logistics with direct supplier procurement, avoiding substandard batches and site delays.",
    icon: "Truck"
  },
  {
    title: "Experienced Workforce",
    description: "Skilled masons, bar benders, carpentering crews, and certified site supervisors managing daily execution.",
    icon: "Users"
  },
  {
    title: "Modern Techniques",
    description: "Laser leveling, concrete vibrators, curing compounds, and modern shuttering systems for pristine finishes.",
    icon: "Cpu"
  },
  {
    title: "Site Supervision",
    description: "Regular site inspections, mix-ratio monitoring, checklist verifications, and progress documentation at every milestone.",
    icon: "Eye"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "residential-construction",
    slug: "residential-house-construction",
    title: "Residential House Construction",
    shortDescription: "Complete turnkey construction for independent houses, duplexes, and multi-family homes built to your custom floor plans.",
    fullDescription: "We handle the entire journey of building your dream residential property from soil testing and foundation laying to RCC roof casting, brickwork, plastering, and turnkey handover. With stage-wise quality checks and dedicated site supervision, your home is built with precision and durability.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Architectural 2D layout & structural drawings",
      "Excavation, anti-termite treatment & strong footing foundation",
      "RCC framed structure with specified grade concrete",
      "Brick masonry with cured cement mortar",
      "Internal and external double-coat plastering",
      "Plumbing, electrical conduit piping, and waterproof testing"
    ],
    timeline: "6 to 12 Months (Based on built-up area)",
    suitableFor: "Landowners planning independent homes, duplexes, and multi-storey residences.",
    keyFeatures: [
      {
        title: "Rigorous Structural Safety",
        description: "Built according to Indian Standard codes with seismic consideration and load-bearing beam calculations."
      },
      {
        title: "Transparent Stage Milestones",
        description: "Work progresses through defined stages: Plinth, Slab casting, Masonry, Finishing, and Handover."
      },
      {
        title: "Strict Material Adherence",
        description: "Only approved brands for cement, TMT rebars, CPVC pipes, and electrical cables are utilized."
      }
    ]
  },
  {
    id: "new-home-construction",
    slug: "new-home-construction",
    title: "New Home Planning & Construction",
    shortDescription: "Architectural floor plans, 3D exterior elevations, structural designs, and end-to-end site execution.",
    fullDescription: "Start your new home on the right foundation with coordinated architectural planning, 3D visualization, and structural drafting. We help visualize room flow, natural ventilation, and daylight before pouring the first concrete slab, ensuring no costly revisions on site.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Custom 2D floor plans optimized for light and ventilation",
      "Photorealistic 3D front elevation renders",
      "Structural column, beam, and footing schedules",
      "Detailed Bill of Quantities (BOQ) with material specifications",
      "Electrical, plumbing & drainage layout drawings",
      "Turnkey site construction with milestone approvals"
    ],
    timeline: "8 to 14 Months",
    suitableFor: "Families building a new custom home from an empty plot.",
    keyFeatures: [
      {
        title: "Vastu & Modern Flow Harmony",
        description: "Layouts tailored to your family's lifestyle, plot orientation, and functional preferences."
      },
      {
        title: "Budget Optimization",
        description: "Clear material choices matched with your planned construction budget before starting work."
      },
      {
        title: "Zero Ambiguity on Site",
        description: "Comprehensive blueprints prevent miscommunication between masons and engineers."
      }
    ]
  },
  {
    id: "renovation-remodeling",
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    shortDescription: "Transform existing properties with floor additions, structural strengthening, modern façade makeovers, and layout reconfigurations.",
    fullDescription: "Give your existing home a second life. Whether you need to add a new first-floor structure, expand living rooms, replace outdated plumbing and flooring, or remodel the external elevation, we execute renovations with careful structural assessment.",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Existing structural stability assessment & load testing",
      "Careful demolition with dust & debris containment",
      "RCC column extension and new slab casting",
      "Modern tile/marble flooring replacement",
      "Complete bathroom and kitchen modernizations",
      "Waterproofing treatments for terraces and damp walls"
    ],
    timeline: "1 to 4 Months",
    suitableFor: "Homeowners looking to upgrade, extend, or restore existing residential or commercial premises.",
    keyFeatures: [
      {
        title: "Structural Safety First",
        description: "We evaluate existing columns and foundations before adding new floor loads."
      },
      {
        title: "Clean Demolition Protocol",
        description: "Minimizing disturbance to adjacent structures and keeping living zones safe."
      },
      {
        title: "Modern Material Integration",
        description: "Seamlessly blending new rooms and modern finishes with older structures."
      }
    ]
  },
  {
    id: "commercial-construction",
    slug: "commercial-construction",
    title: "Commercial & Retail Construction",
    shortDescription: "Practical, durable spaces for shops, retail showrooms, office complexes, and mixed-use commercial buildings.",
    fullDescription: "Commercial spaces require heavy load capacities, open column spans, high footfall durability, and rapid construction turnarounds. We build commercial buildings that offer clear rental utility, robust facade aesthetics, and strict safety compliance.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Open-span structural design for flexible partition walls",
      "Heavy load-bearing floor slabs and deep foundation columns",
      "Commercial grade rolling shutter & toughened glass provisions",
      "High capacity electrical conduits for multi-phase loads",
      "Commercial toilet blocks, drainage, and rainwater harvesting",
      "Facade finishing with ACP/tile/structural glazing provisions"
    ],
    timeline: "6 to 15 Months",
    suitableFor: "Commercial plot owners, retail businesses, clinic/office developers across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.",
    keyFeatures: [
      {
        title: "Optimized Usable Carpet Area",
        description: "Strategic column positioning to maximize storefront visibility and commercial floor utility."
      },
      {
        title: "Heavy-Duty Specifications",
        description: "Industrial strength flooring, high-durability plaster, and weather-resistant external coatings."
      },
      {
        title: "Timely Delivery Focus",
        description: "Scheduled execution milestones so you can start operations or tenant leasing on time."
      }
    ]
  },
  {
    id: "structural-work",
    slug: "structural-work",
    title: "Structural Construction & RCC Framework",
    shortDescription: "Specialized deep excavation, isolated & raft foundations, column casting, beam shuttering, and slab pouring.",
    fullDescription: "The structure is the backbone of any building. We specialize in precision RCC frame construction, ensuring correct rebar spacing, concrete mix ratios, vibration compaction, and water curing schedules for maximum compressive strength.",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Geotechnical soil verification & layout marking",
      "Machine excavation, anti-termite chemical barrier, and PCC bed",
      "Isolated/combined footing with certified TMT steel cages",
      "Plinth beam casting with damp-proof course (DPC)",
      "Column casting with rigid steel shuttering",
      "Beam and slab shuttering with props and 21-day curing schedule"
    ],
    timeline: "2 to 5 Months (Structural phase)",
    suitableFor: "Clients wanting specialized civil contracting for gray structure or RCC framework.",
    keyFeatures: [
      {
        title: "Strict Water-Cement Ratios",
        description: "Measured concrete proportions and mechanical mixer/vibrator usage prevent honeycombing."
      },
      {
        title: "Quality Rebar Binding",
        description: "Accurate overlap lengths, stirrup spacing, and concrete cover blocks on all faces."
      },
      {
        title: "Proper Curing Discipline",
        description: "Guaranteed ponding and hessian cloth curing for minimum 14 to 21 days."
      }
    ]
  },
  {
    id: "finishing-interior",
    slug: "finishing-interior-work",
    title: "Finishing & Interior Civil Work",
    shortDescription: "Plastering, vitrified tile and granite flooring, plumbing lines, electrical wiring, waterproofing, and exterior paint.",
    fullDescription: "Finishing defines the comfort, visual elegance, and weather resistance of your home. We execute high-precision plastering with straight edges, vitrified/granite tile laying with zero hollow spots, concealed plumbing, and multi-coat exterior painting.",
    iconName: "Paintbrush",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Line-dori level wall plastering with smooth sponge finish",
      "Vitrified tiles (2x2, 2x4, 4x2) & polished granite for stairs & kitchen",
      "Concealed CPVC/UPVC water supply & SWR drainage lines",
      "Concealed FR electrical wires, modular switchboards, and MCB boxes",
      "Acrylic wall putty, primer, and weather-shield exterior paint",
      "Bathroom & terrace waterproofing with membrane and polymer coats"
    ],
    timeline: "2 to 4 Months",
    suitableFor: "Homeowners with completed structural frames looking for quality finishing.",
    keyFeatures: [
      {
        title: "Hollow-Free Tile Laying",
        description: "Proper adhesive backing and leveling clips for seamless, flat floor surfaces."
      },
      {
        title: "Hydrostatic Pressure Testing",
        description: "All concealed plumbing lines are pressure tested before plaster sealing to ensure zero leaks."
      },
      {
        title: "Durable Weather Protection",
        description: "Anti-fungal, water-repellent exterior coatings withstand harsh monsoon and summer cycles."
      }
    ]
  }
];

export const PACKAGES_DATA: ConstructionPackage[] = [
  {
    id: "essential",
    name: "Open-Span Hall & Commercial Turnkey",
    tier: "BASIC",
    ratePerSqFt: 1500,
    gstRate: "+ 18% GST",
    badge: "Commercial & Open Hall Value",
    tagline: "Engineered heavy RCC framework and quality civil shell designed for open halls, commercial retail units, and economical residences.",
    priceNote: "₹1,500 / SQFT + 18% GST (Official Civil & Core MEP Scope)",
    bestFor: "Open commercial halls, retail showrooms, warehouse basements, and budget-optimized residential spaces across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.",
    officialPdfRef: "Quotation & Material Specification for Construction of Hall (Residential/Commercial) at ₹1500/SQFT + 18% GST",
    keyPills: [
      "RCC 3:2:1 Concrete Mix",
      "Fe 550D TMT Steel Rebar",
      "UltraTech / ACC Cement",
      "Awwal 1st Class Red Bricks",
      "Cera Sanitary & Faucets",
      "Prominence UPVC Windows",
      "Grade 204 SS Stair Railing",
      "500L Sintex Water Tank"
    ],
    highlights: [
      "Heavy RCC Frame: Engineered 3:2:1 mix (20+10mm & 30+10mm aggregates) for high load-bearing foundations, columns, beams, and roof slabs",
      "Structural Steel: High-ductility Fe 550D TMT rebars (Tata / Jindal / Kamdhenu / Captain or equivalent)",
      "Awwal 1st Class Brickwork: Sharp-edged premium red clay bricks with 6:1 (9-inch) and 5:1 (4.5-inch) rich cement mortar",
      "Flooring: Kajaria / Vermora 2x2 ft vitrified and ceramic tiles (Up to ₹35–40/sq.ft cap)",
      "Sanitaryware: Cera Indian/Western commode suite (₹3,500–₹4,500 cap) and Cera chrome-plated brass taps (₹1,200–₹1,500 cap)",
      "Plumbing: Supreme / Astral heavy-duty UPVC internal water lines and 4\"–5\" PVC drainage piping (5–6 kg/cm² pressure)",
      "Windows: Prominence UPVC sliding windows with 5–6mm clear acoustic glass (Up to ₹450–550/sq.ft cap)",
      "Staircase: Polished Granite or Marble steps with precision edge molding (Up to ₹60–70/sq.ft) and 204 SS railing",
      "Painting: Double-coat wall putty, primer base, and Asian Paints / Nerolac emulsion (₹4,500–₹6,500/bucket cap)"
    ],
    structuredFeatures: [
      {
        category: "Structural & Civil Engineering",
        items: [
          { label: "RCC Concrete Ratio", value: "3:2:1 (Aggregates 20+10mm & 30+10mm, Sand 2, Cement 1)" },
          { label: "Steel Reinforcement", value: "Fe 550D TMT Rebar (Tata / Jindal / Kamdhenu / Captain)" },
          { label: "Approved Cement", value: "UltraTech / ACC ('Not for Sale' Industrial Commercial Grade)" },
          { label: "Brick Masonry", value: "1st Class Awwal Bricks (9\" Mortar 6:1, 4.5\" Mortar 5:1, PCC 8:5:1)" },
          { label: "Shuttering Standard", value: "Waterproof Plywood Shuttering (8–12 ft slab height) with heavy structural props" }
        ]
      },
      {
        category: "Flooring & Stone Finishes",
        items: [
          { label: "Hall & Main Floor Tiles", value: "2x2 ft Vitrified / Ceramic Tiles", cap: "Up to ₹35–40/sq.ft" },
          { label: "Toilets & Washrooms", value: "2x2 ft Anti-Skid Ceramic (Dado up to 7–8 ft height)", cap: "Up to ₹40/sq.ft" },
          { label: "Staircase Steps & Risers", value: "Polished Granite or Marble with Full Edge Molding", cap: "Up to ₹60–70/sq.ft" },
          { label: "Skirting & Borders", value: "4-inch matching perimeter skirting throughout", cap: "Included" }
        ]
      },
      {
        category: "Sanitary, Bath & Water System",
        items: [
          { label: "Sanitaryware Suite", value: "Cera Indian / Western Commode & Washbasin", cap: "₹3,500 – ₹4,500" },
          { label: "CP Faucets & Taps", value: "Cera Chrome-Plated Brass Faucets", cap: "₹1,200 – ₹1,500 / tap" },
          { label: "Internal Plumbing", value: "Supreme / Astral UPVC & PVC lines (5–6 kg pressure)", cap: "Included" },
          { label: "Overhead Storage Tank", value: "500 Litre Sintex PU Insulated Tank", cap: "Included" }
        ]
      },
      {
        category: "Woodwork, Windows & MS Joinery",
        items: [
          { label: "Windows & Glazing", value: "Prominence UPVC Windows with 5–6mm Clear Glass", cap: "Up to ₹450–550/sq.ft" },
          { label: "Washroom Doors", value: "Waterproof UPVC / Aluminium frame & panel", cap: "Included" },
          { label: "Main Entrance Gate", value: "Heavy MS Box Section Gate with primer & enamel coat", cap: "Included" },
          { label: "Staircase Railing", value: "Grade 204 Stainless Steel with molded bends", cap: "Included" }
        ]
      },
      {
        category: "Plastering & Surface Finishing",
        items: [
          { label: "Wall Plastering", value: "15mm external rough (6:1) + 10mm internal smooth sponge (6:1)", cap: "Included" },
          { label: "Internal Wall Painting", value: "2-Coat Putty + Asian Paints / Nerolac Emulsion", cap: "₹4,500 – ₹6,500 / bucket" },
          { label: "MS Metal Protection", value: "Double coat anti-corrosive primer + enamel finish", cap: "Included" }
        ]
      }
    ],
    specificationsSummary: {
      structure: "RCC Framed 3:2:1 concrete mix with Fe 550D TMT Rebar (Kamdhenu/Tata/Jindal), PCC 8:5:1, Awwal brickwork",
      flooring: "Kajaria/Vermora 2x2 ft tiles (Up to ₹35-40/sqft), Granite/Marble stairs with molding (Up to ₹60-70/sqft)",
      kitchen: "Granite cooking platform with edge molding & stainless steel sink",
      bathroom: "Cera Indian/Western Commode (₹3,500-4,500), Cera CP taps (₹1,200-1,500), ceramic wall tiles up to 7-8 ft",
      doorsWindows: "Prominence UPVC windows (₹450-550/sqft), UPVC/Aluminium washroom doors, heavy MS entrance gate",
      painting: "2-coat wall putty + primer + Asian Paints / Nerolac emulsion (₹4,500-6,500/bucket)"
    },
    recommendedFor: "Commercial halls, retail complexes, godowns, and budget-conscious residential builders across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj."
  },
  {
    id: "standard",
    name: "Standard Residential Turnkey Package",
    tier: "BUDGET",
    ratePerSqFt: 1850,
    gstRate: "+ 18% GST",
    badge: "Most Popular in Bhadohi",
    tagline: "Our most requested turnkey residential blueprint featuring branded Jaquar wall-hung sanitaryware, polished dining marble, and UPVC windows.",
    priceNote: "₹1,850 / SQFT + 18% GST (Official Residential Turnkey Scope)",
    bestFor: "2 to 3 floor modern residential family residences, independent duplexes, and villas across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.",
    officialPdfRef: "Quotation & Material Specification for Construction of Building (Residential) at ₹1850/SQFT + 18% GST",
    keyPills: [
      "RCC 3:2:1 Graded Concrete",
      "Fe 550D TMT Steel (Tata/Jindal)",
      "UltraTech Weather Plus / ACC Gold",
      "Jaquar Wall-Hung Commode",
      "Dining Polished Marble",
      "Shakuntalam Flush Doors + Godrej",
      "Prominence UPVC Acoustic Windows",
      "Molded Granite Staircase"
    ],
    highlights: [
      "Engineered RCC Framework: Standardized 3:2:1 mix (Aggregates 20+10mm & 30+10mm, Sand 2, Cement 1) with Fe 550D TMT rebars",
      "Industrial Grade Cement: UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial grade for all casting and foundation stages)",
      "Awwal 1st Class Masonry: High-compressive strength red clay bricks with 6:1 (9\") and 5:1 (4.5\") rich cement-sand mortars",
      "Flooring & Marble: Kajaria / Vermora 2x2 & 2x4 vitrified tiles (Up to ₹40–60/sq.ft) + Polished Natural Marble in Family/Dining Room (Up to ₹80–100/sq.ft)",
      "Kitchen Platform: Jet Black Polished Granite with full machine edge molding (Up to ₹80–90/sq.ft) & stainless steel sink",
      "Staircase Architecture: Granite or Marble steps with full bullnose molding (Up to ₹60–70/sq.ft) and 204 Stainless Steel railing",
      "Sanitary & Bath: Branded Jaquar Wall-Hung Commode & Basin suite (₹5,500–₹6,500 cap) and Jaquar CP Brass Faucets (₹1,200–₹1,500 cap)",
      "Master Bath Shower Mixer: Master Bedroom mixer shower suite including 2-tap washbasin diverter",
      "Doors & Hardware: Shakuntalam or Black Cherry Flush Doors with genuine Godrej mortise locks, handles & brass stoppers",
      "Windows: Prominence UPVC sliding windows with 5–6mm acoustic clear glass (Up to ₹450–550/sq.ft cap)",
      "Electrical: RR Kabel (FRLS) / Havells / Anchor copper wiring with heavy roof & wall conduit piping and modular switches",
      "Painting: Double-coat acrylic putty, primer coat, and Asian Paints / Nerolac Premium Emulsion (₹4,500–₹6,500/bucket cap)"
    ],
    structuredFeatures: [
      {
        category: "Structural & Civil Engineering",
        items: [
          { label: "RCC Concrete Ratio", value: "3:2:1 (Aggregates 20+10mm & 30+10mm, Sand 2, Cement 1)" },
          { label: "Steel Reinforcement", value: "Fe 550D TMT High-Ductility Rebar (Tata / Jindal / Kamdhenu)" },
          { label: "Certified Cement", value: "UltraTech Weather Plus / ACC Gold ('Not for Sale' Industrial Grade)" },
          { label: "Brickwork (Jodai)", value: "1st Class Awwal Bricks (9\" Mortar 6:1, 4.5\" Mortar 5:1, PCC 8:5:1)" },
          { label: "Shuttering Specs", value: "Waterproof Plywood Shuttering (8–12 ft slab height) with structural balli-patra" }
        ]
      },
      {
        category: "Flooring, Marble & Stone Finishes",
        items: [
          { label: "Living, Bed & Kitchen Tiles", value: "2x2 ft or 2x4 ft Vitrified Tiles (Kajaria / Vermora)", cap: "Up to ₹40–60/sq.ft" },
          { label: "Family & Dining Hall", value: "Polished Natural Marble Slabs", cap: "Up to ₹80–100/sq.ft" },
          { label: "Kitchen Counter Platform", value: "Jet Black Polished Granite with Machine Edge Molding", cap: "Up to ₹80–90/sq.ft" },
          { label: "Staircase Steps & Risers", value: "Granite or Marble Steps with Full Bullnose Molding", cap: "Up to ₹60–70/sq.ft" },
          { label: "Balcony, Porch & Terrace", value: "Heavy-Duty Anti-Skid Ceramic / Vitrified Tiles", cap: "Up to ₹35–45/sq.ft" }
        ]
      },
      {
        category: "Sanitary, Bath & Water System",
        items: [
          { label: "Wall-Hung Commode & Basin", value: "Branded Jaquar Wall-Hung Commode & Designer Basin", cap: "₹5,500 – ₹6,500" },
          { label: "Master Bath Shower Suite", value: "Master Bedroom Mixer Shower with 2-Tap Washbasin Diverter", cap: "Included" },
          { label: "CP Faucets & Bib Cocks", value: "Jaquar Chrome-Plated Solid Brass Faucets", cap: "₹1,200 – ₹1,500 / tap" },
          { label: "Concealed Piping", value: "Astral / Supreme CPVC (hot/cold) & UPVC drainage lines", cap: "Included" },
          { label: "Water Storage Tank", value: "500 Litre Sintex PU Insulated Tank", cap: "Included" }
        ]
      },
      {
        category: "Woodwork, Windows & MS Joinery",
        items: [
          { label: "Internal Doors & Frames", value: "Shakuntalam or Black Cherry Ply Flush Doors with Godrej Locks", cap: "Included" },
          { label: "Acoustic UPVC Windows", value: "Prominence UPVC Windows with 5–6mm Clear Glass", cap: "Up to ₹450–550/sq.ft" },
          { label: "Toilet & Washroom Doors", value: "Waterproof UPVC / Heavy Aluminium Section Doors", cap: "Included" },
          { label: "Staircase Railing", value: "Grade 204 Stainless Steel Railing with finished molds", cap: "Included" },
          { label: "Main Entrance Gate", value: "Heavy MS Box Section Architectural Gate with Godrej handle", cap: "Included" }
        ]
      },
      {
        category: "Electrical, Plaster & Painting",
        items: [
          { label: "Electrical Wiring & Conduit", value: "RR Kabel (FRLS) / Havells / Anchor Copper + Modular Sockets", cap: "Included" },
          { label: "Plastering Thickness", value: "15mm external rough (6:1) + 10mm internal fine sponge (6:1)", cap: "Included" },
          { label: "Wall & Ceiling Paint", value: "Double-Coat Putty + Asian Paints / Nerolac Premium Emulsion", cap: "₹4,500 – ₹6,500 / bucket" },
          { label: "Metal Enamel Coating", value: "Anti-rust primer + high-gloss enamel on MS gate & railings", cap: "Included" }
        ]
      }
    ],
    specificationsSummary: {
      structure: "RCC Frame 3:2:1 with Fe 550D TMT Bar (Tata/Jindal/Kamdhenu), UltraTech Weather Plus / ACC Gold, Awwal bricks",
      flooring: "Kajaria/Vermora 2x2 or 2x4 vitrified (Up to ₹40-60/sqft), Marble dining (Up to ₹80-100/sqft), Granite steps with molding (Up to ₹60-70/sqft)",
      kitchen: "Polished Granite Platform with edge molding (Up to ₹80-90/sqft) & SS Sink",
      bathroom: "Jaquar Wall-Hung Commode & Basin (₹5,500-6,500), Jaquar Taps (₹1,200-1,500), Master mixer shower, tiles up to 7-8 ft",
      doorsWindows: "Shakuntalam/Black Cherry flush doors with Godrej locks, Prominence UPVC windows (₹450-550/sqft)",
      painting: "2-coat putty + primer + Nerolac / Asian Paints on walls, ceilings, MS gate & railings"
    },
    recommendedFor: "Our most requested turnkey residential package offering the perfect balance of branded durability and finish."
  },
  {
    id: "premium",
    name: "Premium Luxury Residential Turnkey Package",
    tier: "STANDARD",
    ratePerSqFt: 2250,
    gstRate: "+ 18% GST",
    badge: "Flagship Luxury Turnkey",
    tagline: "Flagship residential construction crafted with full POP designer ceilings, premium Jaquar wall-hung suites, Century Ply woodwork, and luxury marble flooring.",
    priceNote: "₹2,250 / SQFT + 18% GST (Flagship Turnkey with POP & Luxury Jaquar)",
    bestFor: "Luxury independent duplex villas, high-end family residences, and multi-storey builds (Basement + G + 2) across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.",
    officialPdfRef: "Quotation & Material Specification for Construction of Building (Residential) at ₹2250/SQFT + 18% GST",
    keyPills: [
      "Designer POP False Ceilings",
      "Jaquar Wall-Hung (₹7k–₹10k)",
      "Exotic Polished Marble (₹100–₹120)",
      "Century Ply / Advance Doors",
      "Prominence UPVC (₹550–₹750)",
      "UltraTech Weather Plus / ACC Gold",
      "Tata / Jindal 550D TMT",
      "1,000L Sintex PU Tank"
    ],
    highlights: [
      "POP Designer Ceiling Included: Full POP application on ceilings, walls, cornices, and decorative moldings (Up to ₹90–125/sq.ft value)",
      "Sanitaryware Luxury Suite: High-end Jaquar Wall-Hung Commode & Designer Counter Basin (₹7,000–₹10,000 cap)",
      "Jaquar CP Bath Suites: Jaquar luxury range faucets (₹1,500–₹1,800 cap) and Master Bedroom rain mixer shower with 2-tap basin mixer",
      "Flooring Excellence: Large format 2x4 & 2x2 vitrified tiles (Up to ₹60–80/sq.ft, Kajaria / Vermora) and Natural Polished Marble in Living/Dining (Up to ₹100–120/sq.ft)",
      "Granite Craftsmanship: Polished Granite Kitchen Platform with dual edge molding (Up to ₹90–110/sq.ft) and Granite/Marble staircase steps with full bullnose molding (Up to ₹70–80/sq.ft)",
      "Engineered RCC Framework: Heavy structural 3:2:1 mix (20+10mm & 30+10mm aggregates) with Tata / Jindal 550D TMT steel rebars (M-20/20mm bar for slabs)",
      "Commercial Grade Cement: UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial grade for all foundation, column, beam & slab dhalai)",
      "Doors & Joinery: Century Ply or Advance Flush Doors with Godrej luxury mortise locks, handles & brass stoppers",
      "Windows & Acoustical Glazing: Heavy-Duty Prominence UPVC Windows with 5–6mm clear acoustic glass (Up to ₹550–750/sq.ft cap)",
      "Water System: 1,000 Litre PU Insulated Sintex Heavy Tank with Astral / Supreme CPVC & UPVC piping (5–6 kg pressure)",
      "Staircase Railing: Grade 204 / 304 Stainless Steel finished and molded railing with heavy MS box entrance gate",
      "Painting & Coatings: 2-Coat Acrylic Wall Putty + Nerolac / Asian Paints Washable Luxury Emulsion (₹5,000–₹7,000/bucket cap)"
    ],
    structuredFeatures: [
      {
        category: "Structural & Civil Engineering",
        items: [
          { label: "RCC Concrete Ratio", value: "3:2:1 (Aggregates 20+10mm & 30+10mm, Sand 2, Cement 1)" },
          { label: "Steel Specification", value: "Tata / Jindal Fe 550D TMT Steel Rebar (M-20/20mm Slab Bar)" },
          { label: "Certified Cement", value: "UltraTech Weather Plus / ACC Gold ('Not for Sale' Industrial Grade)" },
          { label: "Brick Masonry (Jodai)", value: "1st Class Awwal Bricks with sharp edges (9\" Mortar 6:1, 4.5\" Mortar 5:1, PCC 8:5:1)" },
          { label: "Shuttering System", value: "Marine Waterproof Plywood Shuttering (8–12 ft slab height) with rigid staging" }
        ]
      },
      {
        category: "POP Ceilings, Plaster & Luxury Painting",
        items: [
          { label: "POP Ceiling & Molding", value: "Ceiling, Wall, Cornice & Decorative Moldings (Nerolac/Asian)", cap: "Up to ₹90–125/sq.ft" },
          { label: "Wall & Ceiling Paint", value: "2-Coat Putty + Nerolac / Asian Paints Luxury Washable Emulsion", cap: "₹5,000 – ₹7,000 / bucket" },
          { label: "Plastering Standard", value: "15mm external rough (6:1) + 10mm internal fine sponge (6:1) + 7mm ceiling", cap: "Included" },
          { label: "Joinery & MS Coatings", value: "Double coat primer + high-gloss polyurethane enamel finish", cap: "Included" }
        ]
      },
      {
        category: "Flooring, Marble & Stone Finishes",
        items: [
          { label: "Drawing & Bedroom Tiles", value: "Large 2x4 ft / 2x2 ft Glazed Vitrified (Kajaria / Vermora)", cap: "Up to ₹60–80/sq.ft" },
          { label: "Family & Dining Hall", value: "Exotic Natural Polished Marble Slabs", cap: "Up to ₹100–120/sq.ft" },
          { label: "Kitchen Counter Platform", value: "Exotic Polished Granite with Dual Edge Machine Molding", cap: "Up to ₹90–110/sq.ft" },
          { label: "Staircase Steps & Risers", value: "Granite or Marble Steps with Full Bullnose Molding", cap: "Up to ₹70–80/sq.ft" },
          { label: "Balcony & Terrace Tiles", value: "Wood-Plank & Weatherproof Anti-Skid Vitrified Tiles", cap: "Up to ₹45–60/sq.ft" },
          { label: "Washroom Wall Tiles", value: "Designer Ceramic Anti-Skid Wall Tiles (Height 7–8 Feet)", cap: "Up to ₹60/sq.ft" }
        ]
      },
      {
        category: "Sanitaryware, Faucets & Water System",
        items: [
          { label: "Luxury Wall-Hung Suite", value: "Jaquar Luxury Wall-Hung Commode & Countertop Basin", cap: "₹7,000 – ₹10,000" },
          { label: "Master Bath Shower Suite", value: "Master Bedroom Mixer Shower with 2-Tap Washbasin Diverter", cap: "Included" },
          { label: "CP Brass Faucets", value: "Jaquar Solid Brass Chrome-Plated Taps & Diverters", cap: "₹1,500 – ₹1,800 / tap" },
          { label: "Concealed Piping", value: "Astral / Supreme CPVC (hot/cold) & UPVC drainage lines (6 kg pressure)", cap: "Included" },
          { label: "Water Storage Tank", value: "1,000 Litre Heavy-Duty PU Insulated Sintex Tank", cap: "Included" }
        ]
      },
      {
        category: "Doors, Windows & Fabrication",
        items: [
          { label: "Internal Doors & Hardware", value: "Century Ply or Advance Flush Doors with Godrej Mortise Locks", cap: "Included" },
          { label: "Heavy UPVC Windows", value: "Prominence Heavy UPVC Windows with 5–6mm Clear Glass", cap: "Up to ₹550–750/sq.ft" },
          { label: "Toilet & Washroom Doors", value: "Waterproof UPVC / Aluminium Section Doors", cap: "Included" },
          { label: "Staircase Railing", value: "Grade 204 / 304 Stainless Steel Railing with molded bends", cap: "Included" },
          { label: "Main Entrance Gate", value: "Heavy MS Box Section Architectural Gate with Godrej lock", cap: "Included" }
        ]
      }
    ],
    specificationsSummary: {
      structure: "RCC 3:2:1 with Tata/Jindal 550D TMT, UltraTech Weather Plus / ACC Gold, 9' & 4.5' Awwal Brickwork",
      flooring: "Kajaria/Vermora 2x4 & 2x2 vitrified (₹60-80/sqft), Family Marble (₹100-120/sqft), Molded Granite steps (₹70-80/sqft)",
      kitchen: "Premium Granite with dual edge molding (₹90-110/sqft), SS sink & designer tile dado",
      bathroom: "Jaquar Wall-Hung Commode & Basin (₹7,000-10,000), Jaquar Taps (₹1,500-1,800), Master Mixer Shower, 8ft wall tiles",
      doorsWindows: "Century Ply / Advance flush doors with Godrej locks, Prominence UPVC windows (₹550-750/sqft)",
      painting: "POP work (₹90-125/sqft) + double coat putty + Nerolac / Asian washable emulsion (₹5,000-7,000/bucket)"
    },
    recommendedFor: "Clients desiring the highest tier of turnkey residential quality, brand authenticity, and finish across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj."
  },
  {
    id: "custom",
    name: "Bespoke Architectural Villa & Commercial Complex",
    tier: "PREMIUM",
    ratePerSqFt: 2650,
    gstRate: "+ 18% GST",
    badge: "Bespoke Architecture",
    tagline: "Custom architectural blueprints, imported Italian marble, smart home automation, and tailored structural engineering.",
    priceNote: "₹2,650+ / SQFT + 18% GST (Custom Blueprints & Bespoke BOQ)",
    bestFor: "Bespoke luxury residences, sprawling farmhouse villas, multi-acre estates, and high-rise commercial complexes.",
    officialPdfRef: "Custom Turnkey Engineering & Architectural Agreement",
    keyPills: [
      "Custom 2D/3D Architectural Blueprints",
      "Imported Italian Marble / Slabs",
      "Smart Home Automation Conduits",
      "Kohler / Grohe / Artize Suites",
      "Engineered Basement Retaining Walls",
      "Solid Teakwood Entrance Joinery",
      "Dedicated Senior Site Engineer",
      "Daily Digital Photo Reports"
    ],
    highlights: [
      "Architectural Design Suite: Comprehensive 2D floor plans, 3D elevation renders, structural calculations, and MEP layout diagrams",
      "Basement & Multi-Storey RCC: Structural engineer-certified RCC frame with basement raft, retaining walls, and certified concrete cube testing",
      "Flooring Masterpieces: Imported Italian marble, 6ft x 4ft large porcelain slabs, or engineered hardwood flooring throughout",
      "Designer Ceilings: Full false ceiling with magnetic track lighting, ambient cove profiles, and acoustic insulation",
      "Sanitaryware & Spas: Kohler / Grohe / Jaquar Artize concealed thermostatic diverters, frameless glass shower cubicles, and wall-hung suites",
      "Joinery & Windows: Solid seasoned teakwood main entrance door and Saint-Gobain toughened thermal-break UPVC / slimline aluminum windows",
      "Dedicated Supervision: Full-time Senior Civil Engineer assigned exclusively to your site with daily digital photo & milestone logs"
    ],
    structuredFeatures: [
      {
        category: "Structural Engineering & Foundation",
        items: [
          { label: "Structural Compliance", value: "Anti-seismic RCC frame certified by senior structural consultant with lab cube tests" },
          { label: "Foundation & Retaining", value: "Engineered RCC basement raft, retaining walls, and waterproof chemical admixes" },
          { label: "Rebar & Cement", value: "Tata Tiscon Fe 550D / UltraTech Super Commercial Grade" }
        ]
      },
      {
        category: "Luxury Finishes & Ceilings",
        items: [
          { label: "Flooring", value: "Imported Italian Marble / 6ft x 4ft Glazed Porcelain Slabs / Hardwood Flooring" },
          { label: "Ceiling & Lighting", value: "Full false ceiling with magnetic track LED channels, cove lighting, and acoustic insulation" },
          { label: "Kitchen Civil Framework", value: "Custom modular kitchen ready civil layout with island counter & utility connection" }
        ]
      },
      {
        category: "Sanitary & Automation",
        items: [
          { label: "Bath Fixtures", value: "Kohler / Grohe concealed thermostatic mixers, frameless glass shower cubicles" },
          { label: "Smart Home Readiness", value: "Concealed automation conduits, CAT-6 data networking, and EV charging line" },
          { label: "Project Management", value: "Dedicated Senior Site Engineer with daily digital milestone dashboard & live drone updates" }
        ]
      }
    ],
    specificationsSummary: {
      structure: "Custom anti-seismic RCC frame with senior structural consultant stamp & certified lab tests",
      flooring: "Imported Italian marble, hardwood flooring, or 6ft x 4ft glazed vitrified slabs",
      kitchen: "Custom modular kitchen ready civil framework with island counter and utility zone",
      bathroom: "Kohler / Grohe concealed thermostatic mixers, wall-hung suites & glass partitions",
      doorsWindows: "Seasoned teakwood joinery, thermal-break UPVC / slimline aluminum windows",
      painting: "3-coat putty, Royale Luxury Emulsion, PU polished woodwork & exterior stone cladding"
    },
    recommendedFor: "Architect-designed custom homes and multi-storey commercial retail structures requiring bespoke execution."
  }
];

export const CIVIL_WORKS_BREAKDOWN: CivilWorkCategory[] = [
  {
    id: 1,
    name: "Brick Works",
    particulars: [
      {
        item: "Brick Quality (Eeta)",
        specifications: "Awwal (1st Class Red Brick)",
        remarks: "Best quality with sharp edges, high compressive strength"
      },
      {
        item: "Mortar for 9-Inch Brickwork",
        specifications: "Ratio 6:1",
        remarks: "Sand - 6 parts, Cement - 1 part"
      },
      {
        item: "Mortar for 4.5-Inch Brickwork",
        specifications: "Ratio 5:1",
        remarks: "Sand - 5 parts, Cement - 1 part"
      },
      {
        item: "PCC Works (Bed Concrete)",
        specifications: "Ratio 8:5:1",
        remarks: "Aggregates (20mm & 40mm) - 8, Sand - 5, Cement - 1"
      }
    ]
  },
  {
    id: 2,
    name: "RCC Works (Concrete Casting)",
    particulars: [
      {
        item: "Slab (Dhhalai)",
        specifications: "Ratio 3:2:1",
        remarks: "Aggregates (20+10mm) - 3, Sand - 2, Cement - 1 | Bar (Sariya) (M-20)/20mm Fe 550D"
      },
      {
        item: "Beam",
        specifications: "Ratio 3:2:1",
        remarks: "Aggregates (20+10mm) - 3, Sand - 2, Cement - 1"
      },
      {
        item: "Column",
        specifications: "Ratio 3:2:1",
        remarks: "Aggregates (30+10mm) - 3, Sand - 2, Cement - 1"
      },
      {
        item: "Foundation (Footing & Raft)",
        specifications: "Ratio 3:2:1",
        remarks: "Aggregates (30+10mm) - 3, Sand - 2, Cement - 1"
      }
    ]
  },
  {
    id: 3,
    name: "Shuttering Works",
    particulars: [
      {
        item: "Ply Shuttering",
        specifications: "Waterproof Plywood Shuttering",
        remarks: "Slab Height (8-12 Feet) with proper props and leveling"
      },
      {
        item: "Balli & Patra",
        specifications: "Standard heavy structural support",
        remarks: "Rigid bracing to prevent slab deflection"
      }
    ]
  },
  {
    id: 4,
    name: "Plastering Works",
    particulars: [
      {
        item: "15 mm Thickness Plaster (Rough / External)",
        specifications: "Ratio 6:1",
        remarks: "Sand - 6 parts, Cement - 1 part"
      },
      {
        item: "10 mm Thickness Plaster (Fine / Internal)",
        specifications: "Ratio 6:1",
        remarks: "Sand - 6 parts, Cement - 1 part, smooth sponge finish"
      },
      {
        item: "7 mm Thickness Ceiling Plaster (If needed)",
        specifications: "Ratio 6:1",
        remarks: "Sand - 6 parts, Cement - 1 part"
      }
    ]
  },
  {
    id: 5,
    name: "Electrical Works",
    particulars: [
      {
        item: "Conduit Pipe (Heavy for Roof)",
        specifications: "Heavy PVC Conduit",
        rate: "₹70-75/m Approx",
        remarks: "Any approved brand / Owner choice"
      },
      {
        item: "Conduit Pipe (Medium for Wall)",
        specifications: "Medium PVC Conduit",
        rate: "₹45-50/m Approx",
        remarks: "Concealed in brick masonry with metal boxes"
      },
      {
        item: "Electric Wires",
        specifications: "FRLS Copper (RR Kabel / Havells / Polycab)",
        remarks: "Full layout fulfilled wherever needed"
      },
      {
        item: "Switches & Sockets",
        specifications: "Modular Fittings (RR Kabel / Havells / Anchor)",
        remarks: "3-pin sockets, switches, and fan regulators wherever needed"
      }
    ]
  },
  {
    id: 6,
    name: "Plumbing & Sanitary Works",
    particulars: [
      {
        item: "Sewer Line PVC Pipe",
        specifications: "5\" & 4\" Diameter (6 kg & 5 kg pressure)",
        remarks: "Astral / Supreme or equivalent"
      },
      {
        item: "Waste Water Line",
        specifications: "5\" & 4\" Diameter (6 kg & 5 kg pressure)",
        remarks: "Proper slope and cleanout traps"
      },
      {
        item: "Internal Water Fitting",
        specifications: "0.75\", 1\" and 1.5\" UPVC & CPVC",
        remarks: "Astral / Supreme concealed hot & cold lines"
      },
      {
        item: "Toilet Fitting in Washroom",
        specifications: "Washbasin-1, L_Band 5 angle, Bib-Cock-1, Shower-1",
        remarks: "Master Bedroom mixer shower including washbasin 2 tap (extra need paid by owner)"
      },
      {
        item: "Western / Indian Commode & Washbasin",
        specifications: "Wall-hung / Floor mount with cistern",
        rate: "₹7,000 - ₹10,000 (Premium) / ₹5,500 - ₹6,500 (Std) / ₹3,500 - ₹4,500 (Hall)",
        remarks: "Jaguar Wall-hung in ₹2250; Jaguar in ₹1850; Cera in ₹1500"
      },
      {
        item: "Taps & CP Fittings",
        specifications: "Brass Chrome Plated",
        rate: "₹1,500 - ₹1,800 (Jaguar) / ₹1,200 - ₹1,500 (Jaguar/Cera)",
        remarks: "Quarter turn ceramic cartridge"
      },
      {
        item: "Water Tank",
        specifications: "PU-Sintex Heavy Tank",
        remarks: "Capacity: 1,000 Litre (in ₹2250) / 500 Litre (in ₹1850 & ₹1500)"
      }
    ]
  },
  {
    id: 7,
    name: "Flooring & Stone Works",
    particulars: [
      {
        item: "Tile for Drawing Room, Master Bed 1,2, Other Bed, Kitchen",
        specifications: "2x2 Feet or 2x4 Feet Vitrified",
        rate: "Upto ₹60-80/sqft (₹2250) | Upto ₹40-60/sqft (₹1850) | Upto ₹35-40/sqft (₹1500)",
        remarks: "Kajaria / Vermora or equivalent"
      },
      {
        item: "Tile for Store Room",
        specifications: "2x2 Feet Vitrified",
        rate: "Upto ₹50-60/sqft (₹2250) | Upto ₹35-40/sqft (₹1850)",
        remarks: "Vitrified tiles"
      },
      {
        item: "Tile for Servant Room",
        specifications: "2x2 Feet Vitrified",
        rate: "Upto ₹40/sqft",
        remarks: "Vitrified tiles"
      },
      {
        item: "Tile for Balcony",
        specifications: "2x2 Feet Anti-Skid",
        rate: "Upto ₹45-60/sqft (₹2250) | Upto ₹35-45/sqft (₹1850)",
        remarks: "Weather-resistant Anti-Skid"
      },
      {
        item: "Tile for Porch / Parking",
        specifications: "2x2 Feet Heavy Duty",
        rate: "Upto ₹40/sqft",
        remarks: "Parking Area heavy tiles"
      },
      {
        item: "Tile for Terrace",
        specifications: "2x2 Feet Anti-Skid",
        rate: "Upto ₹50/sqft (₹2250) | Upto ₹40/sqft (₹1850)",
        remarks: "Terrace Anti-Skid tiles"
      },
      {
        item: "Tile for Toilets / Washroom",
        specifications: "2x2 Feet Ceramic & Anti-Skid",
        rate: "Upto ₹60/sqft (₹2250) | Upto ₹40/sqft (₹1850)",
        remarks: "Wall height 7 or 8 Feet, Anti-Skid flooring"
      },
      {
        item: "Tile for Skirting",
        specifications: "4\" Height",
        remarks: "Matched skirting wherever needed across all rooms"
      },
      {
        item: "Marble for Family Room & Dining Room",
        specifications: "Polished Marble",
        rate: "Upto ₹100-120/sqft (₹2250) | Upto ₹80-100/sqft (₹1850)",
        remarks: "Polished finish with clean borders"
      },
      {
        item: "Granite for Kitchen Platform",
        specifications: "Jet Black / Polished Granite",
        rate: "Upto ₹90-110/sqft (₹2250) | Upto ₹80-90/sqft (₹1850)",
        remarks: "Full edge molding included"
      },
      {
        item: "Granite or Marble for Stair Steps",
        specifications: "Granite / Marble Treads & Risers",
        rate: "Upto ₹70-80/sqft (₹2250) | Upto ₹60-70/sqft (₹1850/₹1500)",
        remarks: "Full edge molding and bullnosing included"
      }
    ]
  },
  {
    id: 8,
    name: "Wood and MS Joinery Works",
    particulars: [
      {
        item: "Door (Hardwood Frame with Flush Door)",
        specifications: "Ply: Century or Advance (₹2250) | Shakuntalam / Black Cherry (₹1850)",
        remarks: "Godrej fittings with medium range accessories - Lock, Handle, Stopper"
      },
      {
        item: "Window (Hardwood frame or UPVC)",
        specifications: "Prominence UPVC with 5mm-6mm clear glass",
        rate: "Upto ₹550-750/sqft (₹2250) | Upto ₹450-550/sqft (₹1850/₹1500)",
        remarks: "Prominence UPVC with smooth sliding/casement"
      },
      {
        item: "Washroom / Toilet Door",
        specifications: "UPVC / Aluminium Waterproof",
        remarks: "Moisture-resistant with lock hardware"
      },
      {
        item: "Main Gate - MS Frame",
        specifications: "Heavy MS Box Frame (Tata / Jindal)",
        remarks: "With medium range accessories – Lock, Heavy Handles"
      }
    ]
  },
  {
    id: 9,
    name: "Railing Works",
    particulars: [
      {
        item: "Railing - MS (Balcony / Boundary)",
        specifications: "MS Box and Flat (Tata / Jindal or equivalent)",
        remarks: "With finished and molded joints"
      },
      {
        item: "Steel Railing for Staircase",
        specifications: "Stainless Steel Grade 204 / 304 (Tata / Jindal or equivalent)",
        remarks: "With polished finish and molded handrail"
      }
    ]
  },
  {
    id: 10,
    name: "POP, False Ceiling and Painting Works",
    particulars: [
      {
        item: "POP Work (Ceiling, Wall, Cornice, Moulding)",
        specifications: "Nerolac / Asian Paints or equivalent",
        rate: "Upto ₹90-125/sqft (₹2250)",
        remarks: "Whereas needed. (Special designer 3D effects pay by Owner)"
      },
      {
        item: "Painting – Wall & Ceiling",
        specifications: "Double Coat Putty and Paint (Nerolac / Asian)",
        rate: "Upto ₹5,000 - ₹7,000/bucket (₹2250) | Upto ₹4,500 - ₹6,500/bucket (₹1850/₹1500)",
        remarks: "Colour chosen by owner, smooth washable emulsion"
      },
      {
        item: "Painting – Door & Window",
        specifications: "Primer + Double Coat Putty & Paint",
        remarks: "Colour chosen by owner"
      },
      {
        item: "Painting – MS Main Door & Grill/Railing",
        specifications: "Anti-rust Primer + Double Coat Enamel Paint",
        remarks: "Colour chosen by owner (Nerolac / Asian)"
      }
    ]
  }
];

export const MATERIAL_BRAND_SPECS: MaterialBrandSpecification[] = [
  {
    serialNo: 1,
    category: "Casting (Jodai / Masonry)",
    items: [
      { item: "Brick (Eeta)", specification: "Awwal 1st Class", brand: "Kiln-Burned Local Awwal", remarks: "Sharp edges" },
      { item: "Red Sand (Morang)", specification: "Medium / Super Medium", brand: "Direct Sourced Clean Morang", remarks: "Clean screened" },
      { item: "Cement", specification: "OPC/PPC Grade", brand: "UltraTech or ACC", remarks: "Not for Sale (Commercial Direct)" },
      { item: "Aggregates (Gitti)", specification: "10mm / 20mm / 40mm", brand: "Dhhala Crushed Blue Metal", remarks: "Clean washed" }
    ]
  },
  {
    serialNo: 2,
    category: "RCC Works (Dhalai Concrete)",
    items: [
      { item: "Red Sand (Morang)", specification: "Medium, Super Medium or Thick Sand", brand: "Coarse River Bed Sand", remarks: "High shear strength" },
      { item: "Cement (Dhalai)", specification: "High Compressive / Weather Proof", brand: "UltraTech Weather Plus or ACC Gold", remarks: "Not for Sale Grade" },
      { item: "Steel Bar (Sariya)", specification: "550D TMT (High Ductility)", brand: "Tata / Jindal / Kamdhenu / Captain or eq", remarks: "TMT Rebars Fe550D" },
      { item: "Aggregates (Gitti)", specification: "20mm + 10mm Combined", brand: "Dhhala Angular Aggregates", remarks: "Graded for high density" }
    ]
  },
  {
    serialNo: 3,
    category: "Shuttering Works",
    items: [
      { item: "Ply Shuttering", specification: "Waterproof Film Faced Plywood", brand: "Commercial Grade Formwork", remarks: "Slab Height 8-12 ft" },
      { item: "Balli & Patra", specification: "Heavy Adjustable Props & Plates", brand: "Standard Steel & Hardwood", remarks: "Deflection-free" }
    ]
  },
  {
    serialNo: 4,
    category: "Plastering Works",
    items: [
      { item: "Red Sand (Morang)", specification: "Medium / Super Medium", brand: "Screened Silt-Free Sand", remarks: "Zero crack formula" },
      { item: "Cement", specification: "PPC / OPC High Adhesion", brand: "UltraTech or ACC", remarks: "Not for Sale Grade" }
    ]
  },
  {
    serialNo: 5,
    category: "Electrical Works",
    items: [
      { item: "Conduit Pipe", specification: "Heavy (Roof) & Medium (Wall)", brand: "ISI Heavy Duty PVC", remarks: "₹70-75 & ₹45-50/m" },
      { item: "Electric Wires", specification: "FRLS Copper (Fire Retardant)", brand: "RR Kabel (FRLS), Havells, Anchor, Polycab", remarks: "100% Electrolytic copper" },
      { item: "Modular Switches", specification: "3-Pin Sockets, Switches, Regulators", brand: "RR Kabel (FRLS), Havells, Anchor Roma", remarks: "Modular safety grids" }
    ]
  },
  {
    serialNo: 6,
    category: "Plumbing Works",
    items: [
      { item: "PVC / SWR Pipe", specification: "5\" & 4\" (6kg & 5kg pressure)", brand: "Astral, Supreme or equivalent", remarks: "Leak-proof rubber ring" },
      { item: "UPVC & CPVC Fitting", specification: "0.75\", 1\" & 1.5\" Concealed", brand: "Astral, Supreme or equivalent", remarks: "Hot & cold rated" },
      { item: "Sanitary Ware (WC & Basin)", specification: "Wall-Hung / Floor Mount Suites", brand: "Jaguar, Kohler, Cera or equivalent", remarks: "Premium glaze" },
      { item: "Taps & Diverters", specification: "Chrome Plated Brass", brand: "Jaguar / Cera or equivalent", remarks: "Quarter turn ceramic" },
      { item: "Overhead Water Tank", specification: "500L / 1000L PU Tank", brand: "Sintex PU / Multi-layer", remarks: "UV stabilized" }
    ]
  },
  {
    serialNo: 7,
    category: "Flooring Works (Stone & Tiles)",
    items: [
      { item: "Floor Tiles", specification: "2x2 ft & 2x4 ft Vitrified", brand: "Kajaria / Vermora or equivalent", remarks: "Double charged/glazed" },
      { item: "Marble", specification: "Family & Dining Rooms", brand: "Good Quality Polished Marble", remarks: "Clean vein patterns" },
      { item: "Granite", specification: "Kitchen Counter & Stair Steps", brand: "Good Quality Jet Black / Polished Granite", remarks: "With full molding" }
    ]
  },
  {
    serialNo: 8,
    category: "Wood and M S Works",
    items: [
      { item: "Doors", specification: "Hardwood Frame with Flush Door", brand: "Century Ply, Advance, Shakuntalam, Godrej", remarks: "Godrej hardware" },
      { item: "Windows", specification: "5-6mm Clear Glass Shutters / UPVC", brand: "Prominence UPVC or equivalent", remarks: "Upto ₹450-750/sqft" },
      { item: "Washroom Doors", specification: "Waterproof Flush / Aluminium", brand: "UPVC / Aluminium Frames", remarks: "Corrosion-free" },
      { item: "Main Entrance Gate", specification: "Heavy MS Box Frame", brand: "Tata / Jindal Steel or equivalent", remarks: "With locking hardware" }
    ]
  },
  {
    serialNo: 9,
    category: "Railing Works",
    items: [
      { item: "MS Railing", specification: "Box & Flat Structural Section", brand: "Tata / Jindal or equivalent", remarks: "Finished and molded" },
      { item: "Staircase Railing", specification: "Stainless Steel 204 / 304 Grade", brand: "Tata / Jindal or equivalent", remarks: "Seamless mirror finish" }
    ]
  },
  {
    serialNo: 10,
    category: "POP & Painting Works",
    items: [
      { item: "POP Work", specification: "Ceilings, Walls, Cornice, Mouldings", brand: "Nerolac / Asian Paints or equivalent", remarks: "Upto ₹90-125/sqft" },
      { item: "Wall & Ceiling Paint", specification: "Double Coat Putty + Emulsion", brand: "Nerolac / Asian Paints or equivalent", remarks: "Upto ₹4500-7000/bucket" },
      { item: "Door / Metal Enamel", specification: "Primer + Double Coat Synthetic", brand: "Nerolac / Asian Paints or equivalent", remarks: "Anti-rust protection" }
    ]
  }
];

export const MEASUREMENT_RULES: MeasurementRule[] = [
  {
    item: "Slab Area — 100%",
    percentage: 100,
    description: "Calculated at 100% of clear horizontal outer slab projection dimensions as specified in quotation."
  },
  {
    item: "Double Slab Area / Do Chhatti — 50%",
    percentage: 50,
    description: "Calculated at 50% rate of measured horizontal area as specified in quotation."
  },
  {
    item: "Stair Area — 150%",
    percentage: 150,
    description: "Calculated at 150% rate due to specialized shuttering, reinforcement cage & vertical step risers as specified in quotation."
  }
];

export const PAYMENT_SCHEDULE: PaymentScheduleStage[] = [
  {
    step: "Stage 1",
    stageName: "Booking & Contract Signing",
    percentage: 20,
    description: "20% of Total Project cost after site visit, plan finalization or Contract Signed."
  },
  {
    step: "Stage 2",
    stageName: "Plinth Level Completion",
    percentage: 10,
    description: "10% of Total Project cost till Plinth beam casting & soil compaction completion."
  },
  {
    step: "Stage 3 (Floor-wise)",
    stageName: "Column Casting (Beam Bottom)",
    percentage: 15,
    description: "15% Column casting till bottom of beam level for the respective floor."
  },
  {
    step: "Stage 4 (Floor-wise)",
    stageName: "Retaining / Brick Masonry",
    percentage: 10,
    description: "10% Retaining wall casting till bottom level or complete external & internal brickwork."
  },
  {
    step: "Stage 5 (Floor-wise)",
    stageName: "RCC Slab Casting (Dhalai)",
    percentage: 20,
    description: "20% on completion of shuttering, steel binding & roof slab concrete pouring."
  },
  {
    step: "Stage 6 (Floor-wise)",
    stageName: "Plaster Work Completion",
    percentage: 5,
    description: "5% on completion of internal fine plastering and external rough/sponge plaster."
  },
  {
    step: "Stage 7",
    stageName: "Final Finishing & Key Handover",
    percentage: 20,
    description: "20% on completion of tiles, plumbing, electrical fixtures, painting & deep cleaning.",
    note: "NOTE: If construction work happens for only ONE floor, then 25% EXTRA will be charged for the foundational base structure."
  }
];

export const QUOTATION_EXCLUSIONS: string[] = [
  "Garden & Landscaping (Grass, plants, irrigation sprinkler lines)",
  "Site External Plumbing – Septic tank manholes as required and UPPVC pipes (Skipper / Finolex)",
  "External Compound Boundary Wall & Pillar Caps (Estimated separately)",
  "Special Elevation Features like Pergolas, Louvers, Wooden ACP canopies (Incorporated on separate estimate)",
  "Decorative Light Fixtures & Electrical Appliances (Tube lights, Fans, AC, Exhaust fans, Chandeliers, Fancy lighting)",
  "Air Conditioning (AC) Units & Copper Refrigerant Piping",
  "Loose Furniture, Wardrobes, Beds, Modular Kitchen Cabinetry and TV Units",
  "Elevator / Lift Machine, Railings & Control Equipment",
  "Special Interior or Exterior Special Finishes, HPL Cladding, or Stone Veneers",
  "Wallpaper, Texture Designer Paints & Wall Moldings outside standard scope",
  "Any other interior loose decor items",
  "Heavy Structural Steel Fabrications outside core structural blueprints",
  "Borewell Boring & Submersible Pump installation (Water supply for site)",
  "Main Electrical Power Supply line from electricity pole to site meter (At Owner's risk)",
  "Loose Room Furnishings – Bedroom, Kitchen, Lobby, Drawing Hall loose sets",
  "Tube Light, Fan, AC, Exhaust Fan, Fancy lights or electronic equipment",
  "Main Heavy Power Panel (Power management distribution board, manual/auto changeover, generator links)"
];

export const QUOTATION_TERMS_AND_CONDITIONS: QuotationClause[] = [
  {
    pointNumber: 1,
    english: "The property owner must provide electrical connection and temporary wiring up to the construction site."
  },
  {
    pointNumber: 2,
    english: "The property owner must provide earth/soil for site filling and plinth backfill as required."
  },
  {
    pointNumber: 3,
    english: "The property owner must ensure adequate and continuous water supply at the construction site for mixing and curing."
  },
  {
    pointNumber: 4,
    english: "Work will be executed strictly in accordance with approved architectural and structural drawings. Alterations requested more than once will incur separate revision charges."
  },
  {
    pointNumber: 5,
    english: "The clear floor-to-slab height shall be maintained between 8 feet to 12 feet as per design specification."
  },
  {
    pointNumber: 6,
    english: "The property owner must release milestone stage payments promptly; any project delays or work stoppages arising from payment defaults will be the sole responsibility of the owner."
  },
  {
    pointNumber: 7,
    english: "Quotation rates remain valid for 1 year or within the mutually agreed contract timeline. Upon expiry of this period, a 10% rate escalation surcharge shall apply."
  }
];

export const PACKAGE_COMPARISON_SECTIONS: PackageSpecificationSection[] = [
  {
    category: "Structure & Core Civil",
    features: [
      { featureName: "Turnkey Base Rate", essential: "₹1,500 / sq.ft", standard: "₹1,850 / sq.ft", premium: "₹2,250 / sq.ft", custom: "₹2,650+ / sq.ft" },
      { featureName: "GST Surcharge", essential: "+ 18% GST", standard: "+ 18% GST", premium: "+ 18% GST", custom: "+ 18% GST" },
      { featureName: "Structural Concrete Mix", essential: "RCC 3:2:1 (20+10mm)", standard: "RCC 3:2:1 (20+10mm)", premium: "RCC 3:2:1 (M-20/20mm bar)", custom: "Engineered High-Grade" },
      { featureName: "Steel Rebar Grade", essential: "Fe 550D TMT (Kamdhenu/Capt)", standard: "Fe 550D TMT (Tata/Jindal/Kamdhenu)", premium: "Fe 550D TMT (Tata / Jindal)", custom: "Tata Tiscon Fe550D" },
      { featureName: "Cement Brand & Grade", essential: "UltraTech / ACC ('Not for Sale')", standard: "UltraTech Weather Plus / ACC Gold", premium: "UltraTech Weather Plus / ACC Gold", custom: "UltraTech Super / ACC Gold" },
      { featureName: "Brick Masonry", essential: "Awwal 1st Class (9\" 6:1 & 4.5\" 5:1)", standard: "Awwal 1st Class (9\" 6:1 & 4.5\" 5:1)", premium: "Awwal 1st Class Sharp Edges (6:1)", custom: "Awwal / AAC Blocks" },
      { featureName: "Clear Slab Height", essential: "8 to 12 Feet", standard: "8 to 12 Feet", premium: "8 to 12 Feet", custom: "Custom Arch Height" }
    ]
  },
  {
    category: "Flooring & Wall Tiling",
    features: [
      { featureName: "Living & Master Bedrooms", essential: "2x2 ft Tiles (Upto ₹35-40/sqft)", standard: "2x2/2x4 Tiles (Upto ₹40-60/sqft)", premium: "2x2/2x4 Tiles (Upto ₹60-80/sqft)", custom: "Italian Marble / Glazed Slabs" },
      { featureName: "Family Room & Dining", essential: "Vitrified (2x2 ft)", standard: "Marble (Upto ₹80-100/sqft)", premium: "Marble (Upto ₹100-120/sqft)", custom: "Imported Italian Marble" },
      { featureName: "Kitchen Countertop", essential: "Granite Platform with Molding", standard: "Jet Black Granite (₹80-90/sqft molded)", premium: "Jet Black Granite (₹90-110/sqft molded)", custom: "Quartz / Exotic Granite" },
      { featureName: "Staircase Steps & Treads", essential: "Granite/Marble (₹60-70/sqft molded)", standard: "Granite/Marble (₹60-70/sqft molded)", premium: "Granite/Marble (₹70-80/sqft molded)", custom: "Full Bullnosed + Glass SS" },
      { featureName: "Balcony & Terrace Tiles", essential: "Anti-Skid (Upto ₹35-40/sqft)", standard: "Anti-Skid (Upto ₹35-45/sqft)", premium: "Anti-Skid (Upto ₹45-60/sqft)", custom: "Designer Decking Tiles" }
    ]
  },
  {
    category: "Plumbing & Sanitary",
    features: [
      { featureName: "Water Supply & Waste Lines", essential: "Supreme / Astral (5\" & 4\")", standard: "Supreme / Astral CPVC & UPVC", premium: "Astral / Supreme Heavy CPVC/UPVC", custom: "Heavy Duty Concealed Astral" },
      { featureName: "Sanitary Commode & Basin", essential: "Cera (₹3500-4500)", standard: "Jaguar Wall-Hung (₹5500-6500)", premium: "Jaguar Wall-Hung (₹7000-10000)", custom: "Kohler / Grohe / Artize" },
      { featureName: "CP Taps & Shower Fittings", essential: "Cera (₹1200-1500)", standard: "Jaguar (₹1200-1500) + Mixer", premium: "Jaguar (₹1500-1800) + Master Mixer", custom: "Thermostatic Concealed Diverters" },
      { featureName: "Overhead Water Tank", essential: "500 Litre Sintex Tank", standard: "500 Litre Sintex Tank", premium: "1,000 Litre PU-Sintex Tank", custom: "2000L Multi-layer Insulated" }
    ]
  },
  {
    category: "Electrical & Wood/MS",
    features: [
      { featureName: "Concealed Wiring Cables", essential: "Anchor / Polycab FRLS Copper", standard: "RR Kabel (FRLS) / Havells Copper", premium: "RR Kabel (FRLS) / Havells Copper", custom: "Zero Halogen / Automation Ready" },
      { featureName: "Modular Switches", essential: "Standard Modular Fittings", standard: "RR Kabel / Havells / Anchor Roma", premium: "RR Kabel / Havells 3-Pin Modular", custom: "Legrand / Touch Automation" },
      { featureName: "Doors & Frames", essential: "Flush Doors with Hardwood Frame", standard: "Shakuntalam / Black Cherry + Godrej", premium: "Century Ply / Advance + Godrej", custom: "Seasoned Teakwood Doors" },
      { featureName: "Windows & Ventilators", essential: "Prominence UPVC (₹450-550/sqft)", standard: "Prominence UPVC (₹450-550/sqft)", premium: "Prominence UPVC (₹550-750/sqft)", custom: "Soundproof Saint-Gobain UPVC" },
      { featureName: "Main Entrance Gate", essential: "MS Frame (Tata / Jindal)", standard: "MS Box Frame (Tata / Jindal)", premium: "MS Heavy Box Frame (Tata/Jindal)", custom: "Custom CNC Designer Gate" },
      { featureName: "Staircase Railings", essential: "Steel Railing (Grade 204)", standard: "Steel Railing (Grade 204)", premium: "Steel Railing (Grade 204/304)", custom: "Toughened Glass + SS 304" }
    ]
  },
  {
    category: "POP, Painting & Project Support",
    features: [
      { featureName: "POP False Ceiling & Molding", essential: "Not included in basic", standard: "Optional add-on", premium: "Included (₹90-125/sqft Nerolac/Asian)", custom: "Full Architectural Ceiling Suite" },
      { featureName: "Internal Wall Painting", essential: "Double Coat Putty + Asian/Nerolac", standard: "Double Coat Putty + Asian/Nerolac", premium: "Double Coat Putty + Asian/Nerolac (₹5000-7000/bucket)", custom: "Royale Luxury Emulsion + PU" },
      { featureName: "Exterior & Metal Painting", essential: "Primer + Double Coat Enamel", standard: "Primer + Double Coat Enamel", premium: "Primer + Double Coat Nerolac/Asian", custom: "Silicone Weather-Shield + PU" },
      { featureName: "Measurement Norms", essential: "Slab 100%, Do Chhatti 50%, Stairs 150%", standard: "Slab 100%, Do Chhatti 50%, Stairs 150%", premium: "Slab 100%, Do Chhatti 50%, Stairs 150%", custom: "Standard IS Code Measurement" }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "indira-mill-chauri-rd-01",
    slug: "indira-mill-commercial-residential-complex",
    title: "Commercial & Residential Turnkey Complex (B+G+2)",
    category: "Commercial",
    projectType: "Multi-Storey Complex (B+G+2)",
    location: "Indira Mill Crossing, Chauri Road, Bhadohi",
    stage: "In Progress",
    builtUpArea: "7,800 sq.ft",
    plotSize: "2,600 sq.ft",
    floors: "Basement + Ground + First + Second Floor",
    contractType: "Lump-Sum",
    packageApplied: "Premium Residential & Commercial Turnkey",
    completionYear: "2025 - 2026",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Official full-turnkey commercial and residential complex execution at Indira Mill Crossing on Chauri Road, Bhadohi. Features an engineered waterproof basement, ground commercial showrooms, and 2 upper residential levels built with UltraTech/ACC commercial grade cement, 550D TMT steel rebars, and 9-inch 6:1 Awwal brick masonry.",
    scopeOfWork: [
      "Engineered RCC basement retaining walls and column footings",
      "RCC 3:2:1 casting with Fe 550D TMT and UltraTech Weather Plus cement",
      "Awwal 1st Class sharp-edge brickwork with 6:1 and 5:1 mortar",
      "Prominence UPVC sound-dampening windows and heavy MS entrance gate",
      "Astral/Supreme plumbing, Jaguar wall-hung sanitary ware & 1000L PU Sintex tanks",
      "Kajaria 2x4 vitrified tiles, polished marble dining zones & molded granite stairs"
    ],
    highlights: [
      "Full compliance with M/S Abdul Salam Constructions Company official quotation standards",
      "Stage-wise milestone payments (20% Booking, 10% Plinth, 15% Column, 10% Wall, 20% Slab, 5% Plaster, 20% Handover)",
      "High-durability 3:2:1 concrete mix with 20+10mm aggregates for long-term load bearing",
      "Dedicated site supervisor with on-call engineering hotline (+91 9305215202)"
    ],
    timeline: [
      { phase: "Phase 1", title: "Excavation & Basement Raft", status: "Completed", description: "Deep excavation, soil compaction, and RCC raft casting with waterproof additives." },
      { phase: "Phase 2", title: "Columns & Retaining Walls", status: "Completed", description: "Heavy column casting till bottom of beam level and retaining wall pouring." },
      { phase: "Phase 3", title: "Multi-Storey Slab Casting", status: "In Progress", description: "Ground, 1st, and 2nd floor RCC slab casting using 3:2:1 graded concrete mix." },
      { phase: "Phase 4", title: "Brickwork & MEP Conduits", status: "Planned", description: "9\" external and 4.5\" internal Awwal brickwork and concealed electrical piping." },
      { phase: "Phase 5", title: "Plastering, Tiling & Handover", status: "Planned", description: "Double coat putty, Nerolac/Asian paint, Jaguar bath suites & final handover." }
    ]
  },
  {
    id: "harirampur-residence-01",
    slug: "harirampur-modern-residence",
    title: "Modern Duplex Residence",
    category: "Residential",
    projectType: "Independent Duplex Home",
    location: "Harirampur, Aurai Road, Bhadohi",
    stage: "In Progress",
    builtUpArea: "2,850 sq.ft",
    plotSize: "1,800 sq.ft (30 x 60)",
    floors: "G + 1 Floor",
    contractType: "Cost-Plus",
    packageApplied: "Standard Package",
    completionYear: "2025 - 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A contemporary duplex family residence designed with spacious double-height living room, Vastu-compliant north-east prayer zone, natural skylight, and large balconies.",
    scopeOfWork: [
      "Deep isolated footing foundation with anti-termite barrier",
      "RCC frame with M25 concrete mix and Fe550D rebar grid",
      "Class 1 kiln-burnt brick masonry with cement-sand mortar",
      "Concealed electrical conduit and plumbing piping",
      "Ongoing: Internal wall plastering and terrace waterproofing screed"
    ],
    highlights: [
      "Double height central living hall with ambient light well",
      "Covered car parking and landscaped front yard setback",
      "Large 4x2 vitrified tile flooring planned in all suites",
      "Rainwater recharge pit integrated into site drainage"
    ],
    timeline: [
      { phase: "Phase 1", title: "Excavation & Footing", status: "Completed", description: "Soil verification, deep footing casting, and plinth beam tie." },
      { phase: "Phase 2", title: "RCC Structural Frame", status: "Completed", description: "Ground and first floor column casting and slab pouring." },
      { phase: "Phase 3", title: "Brickwork & Shuttering", status: "Completed", description: "Exterior 9-inch walling and interior 4.5-inch partition walls." },
      { phase: "Phase 4", title: "Plumbing & Electrical Rough-in", status: "In Progress", description: "Concealed conduit piping, switch boxes, and pressure tests." },
      { phase: "Phase 5", title: "Plastering, Tiling & Finishing", status: "Planned", description: "Internal smooth sponge plaster, tile laying, and painting." }
    ]
  },
  {
    id: "bhadohi-city-villa-02",
    slug: "bhadohi-grand-family-villa",
    title: "Grand Family Villa",
    category: "Villas",
    projectType: "Luxury Villa",
    location: "Civil Lines / Station Road Area, Bhadohi",
    stage: "Completed",
    builtUpArea: "4,200 sq.ft",
    plotSize: "3,200 sq.ft (40 x 80)",
    floors: "G + 2 Floors",
    contractType: "Lump-Sum",
    packageApplied: "Premium Package",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A flagship 3-storey private villa featuring contemporary brick and textured elevation, solid teakwood entrance, Italian marble flooring in ground floor living area, and rooftop terrace garden.",
    scopeOfWork: [
      "End-to-end turnkey architectural design and construction",
      "Reinforced heavy raft foundation for high structural stability",
      "High grade internal plastering with zero hollow tolerances",
      "Granite staircase with custom glass and stainless steel balustrade",
      "Complete bathroom fixtures, modular electricals, and exterior weather coating"
    ],
    highlights: [
      "5 master bedrooms with attached private bathrooms and walk-in dressers",
      "Open-plan modular kitchen layout with connected utility washing area",
      "Dedicated home theater and library room on 2nd floor",
      "Solar water heater conduits and CCTV security wiring pre-installed"
    ],
    timeline: [
      { phase: "Phase 1", title: "Substructure & Foundation", status: "Completed", description: "Raft foundation, column starter cages, and damp-proof course." },
      { phase: "Phase 2", title: "Superstructure Frame", status: "Completed", description: "G+2 column casting, beam shuttering, and cured slab pours." },
      { phase: "Phase 3", title: "Civil Finishing", status: "Completed", description: "Full brick masonry, internal sponge plaster, and exterior elevation plaster." },
      { phase: "Phase 4", title: "Tiling & Sanitary", status: "Completed", description: "Italian marble flooring, Jaquar bath suites, and false ceiling LED layout." },
      { phase: "Phase 5", title: "Handover & Documentation", status: "Completed", description: "Final quality check, deep cleaning, and project handover." }
    ]
  },
  {
    id: "aurai-road-commercial-03",
    slug: "aurai-road-commercial-complex",
    title: "Aurai Road Commercial Complex",
    category: "Commercial",
    projectType: "Retail & Office Building",
    location: "Aurai Road, Bhadohi",
    stage: "In Progress",
    builtUpArea: "6,500 sq.ft",
    plotSize: "2,500 sq.ft (50 x 50)",
    floors: "Basement + G + 2 Floors",
    contractType: "Cost-Plus",
    packageApplied: "Custom Commercial",
    completionYear: "2025 - 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A multi-purpose commercial complex engineered for flexible retail showroom space on the ground floor and professional office cabins on upper levels.",
    scopeOfWork: [
      "Waterproof basement retaining wall casting and excavation",
      "Heavy load-bearing columns with wide column grid for open retail visibility",
      "High-traffic vitrified floor tiles (600x1200mm)",
      "Three-phase electrical distribution with separate sub-meter boards",
      "External facade structure with glass and aluminum paneling mounts"
    ],
    highlights: [
      "Wide frontage on Aurai Road with dedicated customer parking",
      "Open-span interior floor plates customizable by prospective tenants",
      "Heavy duty emergency water storage and fire safety pipe runs"
    ],
    timeline: [
      { phase: "Phase 1", title: "Basement Shoring & Retaining Walls", status: "Completed", description: "Deep excavation, waterproof RCC retaining walls." },
      { phase: "Phase 2", title: "Heavy RCC Frame", status: "Completed", description: "Commercial grade column casting up to 2nd floor." },
      { phase: "Phase 3", title: "Masonry & Plaster", status: "In Progress", description: "External boundary, partition walls, and plumbing conduits." },
      { phase: "Phase 4", title: "Commercial Finishing", status: "Planned", description: "Flooring, rolling shutters, glass facade mounts." }
    ]
  },
  {
    id: "gyanpur-road-residence-04",
    slug: "gyanpur-road-contemporary-home",
    title: "Contemporary 3-BHK Residence",
    category: "Residential",
    projectType: "Single Family Home",
    location: "Near Gyanpur Road, Bhadohi",
    stage: "Completed",
    builtUpArea: "2,200 sq.ft",
    plotSize: "1,500 sq.ft (30 x 50)",
    floors: "G + 1 Floor",
    contractType: "Lump-Sum",
    packageApplied: "Standard Package",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A sleek, practical 3-bedroom residential home built with focus on cost optimization, functional space utilization, and thermal comfort.",
    scopeOfWork: [
      "Structural excavation and anti-termite soil treatment",
      "RCC framed structure with Fe500D steel rebars and OPC cement",
      "Concealed electrical wiring with Anchor modular switches",
      "Cera sanitary fittings and glazed wall tiles up to 7 feet in all bathrooms",
      "Weather-shield exterior painting with contrasting charcoal borders"
    ],
    highlights: [
      "Optimized 30x50 layout with zero wasted corridor space",
      "Well-ventilated kitchen with connected utility wash balcony",
      "Dedicated covered porch for 4-wheeler parking"
    ],
    timeline: [
      { phase: "Phase 1", title: "Foundation", status: "Completed", description: "Plinth construction and soil compaction." },
      { phase: "Phase 2", title: "RCC Frame", status: "Completed", description: "Columns, beams, and cured slab casting." },
      { phase: "Phase 3", title: "Finishing & Handover", status: "Completed", description: "Tile laying, sanitary fittings, electrical switches, and painting." }
    ]
  },
  {
    id: "gopiganj-renovation-05",
    slug: "gopiganj-heritage-home-remodel",
    title: "Structural Renovation & 1st Floor Extension",
    category: "Renovation",
    projectType: "Home Expansion & Modernization",
    location: "Gopiganj Corridor, Bhadohi District",
    stage: "In Progress",
    builtUpArea: "1,900 sq.ft",
    plotSize: "2,000 sq.ft",
    floors: "1st Floor Addition + Ground Remodel",
    contractType: "Cost-Plus",
    packageApplied: "Custom Renovation",
    completionYear: "2025",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Adding a brand new 2-bedroom first-floor suite on top of an existing ground floor home, complete with structural column retrofitting and modern exterior elevation makeover.",
    scopeOfWork: [
      "Non-destructive testing of existing ground floor load-bearing walls",
      "Column jacketing and structural tie beam extension",
      "Lightweight AAC block masonry for minimal dead-load on existing foundation",
      "New modern bathroom plumbing and waterproofing of old terrace joint",
      "New contemporary facade cladding and balcony glass railings"
    ],
    highlights: [
      "Seamless structural integration with existing ground floor",
      "Modernized exterior look elevating property value",
      "New lightweight staircase with granite tread finish"
    ],
    timeline: [
      { phase: "Phase 1", title: "Structural Assessment & Jacketing", status: "Completed", description: "Column extensions and load verification." },
      { phase: "Phase 2", title: "First Floor Slab Pour", status: "Completed", description: "Shuttering and concrete casting." },
      { phase: "Phase 3", title: "AAC Block Walling & Plumbing", status: "In Progress", description: "Lightweight masonry and concealed piping." },
      { phase: "Phase 4", title: "Plastering & Painting", status: "Planned", description: "Elevation makeover and final coat." }
    ]
  },
  {
    id: "suriyawan-residence-06",
    slug: "suriyawan-modern-bungalow",
    title: "Suburban Modern Bungalow",
    category: "Residential",
    projectType: "Independent Bungalow",
    location: "Suriyawan Road, Bhadohi",
    stage: "Completed",
    builtUpArea: "3,100 sq.ft",
    plotSize: "2,400 sq.ft (40 x 60)",
    floors: "G + 1 Floor",
    contractType: "Lump-Sum",
    packageApplied: "Standard Package",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "A spacious 4-bedroom bungalow featuring open-concept family spaces, private rear courtyard, master suite with terrace access, and energy-efficient cross-ventilation.",
    scopeOfWork: [
      "Turnkey civil construction and architectural planning",
      "RCC framework with high compressive strength concrete",
      "Double charged vitrified flooring and granite kitchen counters",
      "Teak wood main entrance frame and UPVC windows with mosquito mesh",
      "Full exterior acrylic weather shield with textured feature wall"
    ],
    highlights: [
      "Spacious 40-foot wide road frontage with grand entry gate",
      "Private internal courtyard bringing sunlight to center of the home",
      "Generous terrace area for social gatherings"
    ],
    timeline: [
      { phase: "Phase 1", title: "Foundation & Plinth", status: "Completed", description: "Excavation, footing, plinth masonry, and soil backfill." },
      { phase: "Phase 2", title: "Superstructure Frame", status: "Completed", description: "Columns, lintels, chajjas, and slab concrete." },
      { phase: "Phase 3", title: "Masonry & Plaster", status: "Completed", description: "Red brick walls, double-coat sand plaster." },
      { phase: "Phase 4", title: "Finishing & Handover", status: "Completed", description: "Tile laying, doors, electrical, plumbing, and paint." }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "testimonial-1",
    customerName: "Homeowner Review (Aurai Road Project)",
    location: "Harirampur, Bhadohi",
    projectType: "Duplex Residential Construction",
    quote: "The site supervision and regular progress communication by Abdul Salam Construction gave our family peace of mind. Every stage from foundation to slab casting was explained clearly without hidden costs.",
    rating: 5,
    date: "Recent Project",
    verifiedLabel: "Verified Project Owner"
  },
  {
    id: "testimonial-2",
    customerName: "Homeowner Review (Civil Lines Villa)",
    location: "Bhadohi City",
    projectType: "Turnkey Residential Villa",
    quote: "Building a home is a major life decision. Their team adhered strictly to the promised material specifications. The concrete mix quality, steel bar spacing, and final plaster finish were outstanding.",
    rating: 5,
    date: "Completed Handover",
    verifiedLabel: "Verified Project Owner"
  },
  {
    id: "testimonial-3",
    customerName: "Client Review (Commercial Complex)",
    location: "Aurai Road, Bhadohi",
    projectType: "Commercial Building",
    quote: "We chose their transparent construction contract model. Having clear bills for materials and labor gave us full control over our project budget. Highly recommended for honest work.",
    rating: 5,
    date: "In-Progress Milestone",
    verifiedLabel: "Commercial Client"
  },
  {
    id: "testimonial-4",
    customerName: "Homeowner Review (Gyanpur Road)",
    location: "Near Gyanpur Road, Bhadohi",
    projectType: "3-BHK Residential House",
    quote: "Very professional team. They helped us finalize our 2D floor plans and 3D elevation before starting ground work. The construction was completed on schedule with zero compromise on quality.",
    rating: 5,
    date: "Completed Handover",
    verifiedLabel: "Verified Project Owner"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Transparent Communication",
    description: "Clear stage milestones, open material logs, and upfront pricing with no hidden charges or sudden cost surprises.",
    icon: "MessageSquare"
  },
  {
    title: "Quality Workmanship",
    description: "Skilled masons, accurate plumb-line brickwork, proper rebar binding, and strict water curing discipline for durable homes.",
    icon: "Award"
  },
  {
    title: "Reliable Execution",
    description: "Systematic project scheduling from excavation to turnkey finishing, keeping construction moving on track.",
    icon: "Clock"
  },
  {
    title: "Clear Architectural Planning",
    description: "Coordinated 2D floor plans and photorealistic 3D elevations so you know exactly how your home will look before building.",
    icon: "Compass"
  },
  {
    title: "Professional Supervision",
    description: "Active on-site engineering supervision ensuring correct cement ratios, structural safety, and material adherence.",
    icon: "CheckCircle"
  },
  {
    title: "Customer-Focused Approach",
    description: "Flexible consultation, accommodating client preferences, and guiding you through material selections with care.",
    icon: "HeartHandshake"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "How do I start a construction project with Abdul Salam Construction?",
    answer: "You can start by sharing your basic plot details, location, and requirement through our 'Get a Free Quote' form or by booking a site consultation. Our team will review your plot dimensions, discuss your functional preferences, and arrange an on-site visit to discuss the next steps."
  },
  {
    id: "faq-2",
    category: "General",
    question: "What types of construction projects do you handle?",
    answer: "We handle turnkey residential house construction (independent homes, duplexes, villas), new custom home planning & design, floor additions & structural renovations, commercial retail complexes, and specialized RCC structural framework."
  },
  {
    id: "faq-3",
    category: "Process",
    question: "Can I discuss my project requirements before getting a formal quote?",
    answer: "Yes, absolutely. We encourage an initial consultation to discuss your family size, budget expectations, plot dimensions, and layout ideas. This allows us to provide a realistic, customized estimate tailored specifically to your site."
  },
  {
    id: "faq-4",
    category: "Process",
    question: "How is the construction process planned and monitored?",
    answer: "Our process follows 6 disciplined stages: 1) Consultation & Site Inspection, 2) Planning & 3D Design, 3) Detailed Estimation & BOQ, 4) Structural & Masonry Construction, 5) Quality Checks & Finishing, and 6) Handover. Site supervisors monitor daily progress and provide milestone updates."
  },
  {
    id: "faq-5",
    category: "Pricing",
    question: "What information do you need for an accurate estimate?",
    answer: "To calculate an accurate estimate, we need your plot size (e.g., 30x50 ft), the planned built-up area, the number of floors (e.g., G+1), your preferred package/finishing level (Essential, Standard, Premium), and the site location across Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj or nearby areas."
  },
  {
    id: "faq-6",
    category: "Pricing",
    question: "What is the difference between Cost-Plus and Lump-Sum contracts?",
    answer: "In a Cost-Plus contract, you pay the actual transparent cost of materials and labor plus an agreed project management fee, giving you complete visibility into every invoice. In a Lump-Sum contract, we agree on a fixed total price based on pre-decided specifications and drawings."
  },
  {
    id: "faq-7",
    category: "Materials",
    question: "Do you handle renovation and remodeling projects?",
    answer: "Yes, we handle structural renovations, adding new floors on existing homes, bathroom and kitchen modernizations, damp-proofing, and external elevation makeovers after conducting a structural safety assessment of the existing building."
  },
  {
    id: "faq-8",
    category: "Materials",
    question: "Which material brands and specifications do you use?",
    answer: "We use only tested, ISI-certified materials from trusted manufacturers including UltraTech / ACC / Birla cement, Fe550 TMT steel rebars, Astral / Supreme CPVC plumbing, Havells / Polycab wiring, and Jaquar / Cera sanitary fittings depending on your chosen package."
  },
  {
    id: "faq-9",
    category: "Service Areas",
    question: "Which areas do you provide construction services in?",
    answer: "We primarily operate across Bhadohi, Mirzapur, Jaunpur, Varanasi, and Prayagraj — including Harirampur, Aurai Road, Gyanpur, Gopiganj, Suriyawan, and the wider Purwanchal region."
  },
  {
    id: "faq-10",
    category: "General",
    question: "Can I request an on-site consultation at my plot?",
    answer: "Yes. You can submit your plot location and contact details through our website, and we will schedule a convenient date to inspect your plot, evaluate road access, soil characteristics, and discuss layout options directly on site."
  }
];

export const SERVICE_AREAS_DATA: ServiceArea[] = [
  {
    id: "bhadohi",
    name: "Bhadohi",
    district: "Bhadohi (Sant Ravidas Nagar)",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Central Office Hub / 0 - 5 km",
    landmark: "Civil Lines, Station Road, Harirampur, Aurai Road, Main Bazaar",
    description: "Our home base — comprehensive turnkey residential and commercial construction services across Bhadohi city and all its localities.",
    popularServices: ["Independent Duplex Homes", "Commercial Complexes", "Luxury Villas", "Renovation"]
  },
  {
    id: "gyanpur",
    name: "Gyanpur",
    district: "Bhadohi District HQ",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 12 km",
    landmark: "Collectorate, District Hospital Road, Degree College Area",
    description: "Serving residential landowners, government employee housing, and independent duplex projects in Gyanpur.",
    popularServices: ["New Home Planning & 3D Elevation", "Turnkey Construction", "Structural Civil Work"]
  },
  {
    id: "gopiganj",
    name: "Gopiganj",
    district: "Bhadohi",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 18 km",
    landmark: "GT Road Junction, Gopiganj Market, Highway Belt",
    description: "Active construction coverage for residential homes, warehouse structures, and commercial retail units on the GT Road axis.",
    popularServices: ["Commercial Buildings", "Residential Houses", "First Floor Additions"]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    district: "Varanasi",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 48 km",
    landmark: "Varanasi City & Ring Road Corridor",
    description: "Premium residential villas, duplex homes, and commercial construction delivered with the same transparent BOQ standards across Varanasi.",
    popularServices: ["Luxury Villas", "Duplex Homes", "Commercial Showrooms"]
  },
  {
    id: "mirzapur",
    name: "Mirzapur",
    district: "Mirzapur",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 45 km",
    landmark: "Vindhyachal Corridor, NH-35 Connectivity",
    description: "Turnkey residential and commercial construction services across Mirzapur city and its surrounding growth corridors.",
    popularServices: ["Residential House Construction", "Commercial Buildings", "Turnkey Civil Work"]
  },
  {
    id: "jaunpur",
    name: "Jaunpur",
    district: "Jaunpur",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 55 km",
    landmark: "Jaunpur City & Adjoining Tehsil Belt",
    description: "Structured turnkey construction and civil engineering execution for residential plots and commercial developments across Jaunpur.",
    popularServices: ["Independent Houses", "Commercial Complexes", "RCC Structural Frame"]
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    district: "Prayagraj",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Approx. 90 km",
    landmark: "Prayagraj City & Surrounding Tehsils",
    description: "Full-scope turnkey construction and site engineering supervision for residential and commercial clients across Prayagraj.",
    popularServices: ["Residential House Construction", "Commercial Buildings", "Site Consultations"]
  },
  {
    id: "nearby-areas",
    name: "& Nearby Areas",
    district: "Purwanchal Region",
    state: "Uttar Pradesh",
    status: "Active Coverage",
    distanceFromOffice: "Varies by location",
    landmark: "Harirampur, Aurai Road, Suriyawan, and adjoining Purwanchal corridors",
    description: "Dependable construction execution for residential colonies and mixed-use properties across the wider Purwanchal region.",
    popularServices: ["Residential Villas", "Duplex Homes", "Commercial Shops"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Contemporary Villa Facade",
    category: "Exterior Architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    location: "Harirampur, Bhadohi"
  },
  {
    id: "g2",
    title: "Precision RCC Slab Casting",
    category: "Structural Work",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    location: "Aurai Road Project"
  },
  {
    id: "g3",
    title: "Modern 3-Storey Residence",
    category: "Residential Construction",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    location: "Civil Lines, Bhadohi"
  },
  {
    id: "g4",
    title: "Living Hall & Staircase Detailing",
    category: "Finishing & Interiors",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    location: "Gyanpur Road Residence"
  },
  {
    id: "g5",
    title: "Brickwork & Shuttering Progress",
    category: "Site Execution",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    location: "Commercial Site, Aurai Road"
  },
  {
    id: "g6",
    title: "Luxury Duplex Home Finish",
    category: "Residential Architecture",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    location: "Suriyawan Project"
  }
];
