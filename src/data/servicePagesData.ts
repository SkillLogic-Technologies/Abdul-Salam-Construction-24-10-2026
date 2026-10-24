export interface ServicePageSpecItem {
  label: string;
  specification: string;
  brandOrGrade?: string;
  notes?: string;
}

export interface ServicePackageScope {
  packageName: string;
  rate: string;
  scopeSummary: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  serviceEntity: string;
  category: string;
  heroBadge: string;
  metaTitle: string;
  metaDescription: string;
  definition: string;
  scopeDescription: string;
  keyDeliverables: string[];
  specifications: ServicePageSpecItem[];
  packageComparison: ServicePackageScope[];
  inclusions: string[];
  exclusions: string[];
  faqs: ServiceFAQ[];
  relatedServiceSlugs: string[];
  image: string;
}

export const INDIVIDUAL_SERVICES_DATA: Record<string, ServiceDetail> = {
  'residential-turnkey-construction': {
    slug: 'residential-turnkey-construction',
    title: 'Residential Turnkey Construction',
    shortTitle: 'Turnkey Construction',
    serviceEntity: 'Residential Turnkey Construction',
    category: 'Primary Commercial Service Entity',
    heroBadge: 'Primary Turnkey Solution',
    metaTitle: 'Residential Turnkey Construction in Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj | M/S Abdul Salam Constructions Company',
    metaDescription: 'Complete residential turnkey construction by M/S Abdul Salam Constructions Company. End-to-end civil works, RCC casting, brickwork, MEP, flooring, wood, MS, and painting.',
    definition: 'Residential Turnkey Construction is a comprehensive single-contract building delivery model where M/S Abdul Salam Constructions Company executes all stages of home construction—from foundation excavation and structural RCC frame casting to brick masonry, plastering, concealed MEP (electrical & plumbing), flooring, joinery, and interior/exterior painting—handing over a fully functional, ready-to-occupy home.',
    scopeDescription: 'The turnkey scope encompasses all core civil engineering and finishing works specified in the official construction quotation. Work proceeds through transparent, verified progress milestones with approved material brands and specifications.',
    keyDeliverables: [
      'Site layout, excavation, anti-termite treatment, and PCC bed concrete (8:5:1 ratio)',
      'RCC isolated column footings, plinth tie beams, floor columns, and roof slab casting (3:2:1 concrete ratio)',
      'High-strength Fe 550D TMT steel rebar reinforcement and commercial-grade UltraTech or ACC cement',
      'First-class Awwal kiln-burnt red clay brick masonry (9-inch exterior walls in 6:1 mortar, 4.5-inch interior walls in 5:1 mortar)',
      'External 15mm double-coat and internal 10mm smooth sponge plastering (6:1 mortar ratio)',
      'Concealed heavy and medium PVC electrical conduits with FRLS copper wiring and modular switches',
      'Concealed CPVC/UPVC water supply lines, PVC drainage piping, branded sanitaryware, and chrome-plated brass faucets',
      'Vitrified tile flooring (2x2 ft or 2x4 ft), polished natural marble in family/dining halls, and granite kitchen platforms with edge molding',
      'Flush doors with hardwood frames and Godrej locks, Prominence UPVC windows with acoustic glass, and heavy MS main entrance gate',
      'Double-coat wall putty, primer, and washable emulsion painting on walls and ceilings'
    ],
    specifications: [
      { label: 'Structural Concrete Mix', specification: 'Ratio 3:2:1 (Aggregates 20+10mm or 30+10mm - 3 parts, Sand - 2 parts, Cement - 1 part)', brandOrGrade: 'M20 equivalent field mix' },
      { label: 'TMT Reinforcement Steel', specification: 'Fe 550D High-Ductility Rebar (M-20 / 20mm slab bar specified)', brandOrGrade: 'Tata / Jindal / Kamdhenu / Captain or equivalent as specified in quotation' },
      { label: 'Cement Specified in Quotation', specification: 'High-compressive commercial grade', brandOrGrade: 'UltraTech Weather Plus / ACC Gold (\'Not for Sale\' industrial packaging)' },
      { label: 'Brick Masonry (Jodai)', specification: 'Awwal (1st Class Red Clay Bricks with sharp edges)', notes: '9-inch walls in 6:1 mortar, 4.5-inch walls in 5:1 mortar' },
      { label: 'Clear Floor-to-Slab Height', specification: '8 Feet to 12 Feet', notes: 'Maintained as per approved structural drawings' }
    ],
    packageComparison: [
      {
        packageName: 'Residential Hall Turnkey Quotation',
        rate: '₹1,500 / SQFT + 18% GST',
        scopeSummary: 'Heavy RCC frame (3:2:1), Awwal brickwork, 2x2 vitrified tiles (₹35-40/sqft), Cera sanitaryware, Prominence UPVC windows, MS gate, 204 SS stair railing, and Asian Paints/Nerolac emulsion. POP false ceiling is not included.'
      },
      {
        packageName: 'Standard Residential Building Turnkey Quotation',
        rate: '₹1,850 / SQFT + 18% GST',
        scopeSummary: 'RCC 3:2:1 frame with Fe 550D steel, UltraTech/ACC cement, 2x2/2x4 vitrified tiles (₹40-60/sqft) plus polished natural marble in family/dining room (₹80-100/sqft), Jaquar wall-hung commode suite (₹5,500-6,500), Shakuntalam/Black Cherry flush doors with Godrej locks, and Prominence UPVC windows.'
      },
      {
        packageName: 'Premium Residential Building Turnkey Quotation',
        rate: '₹2,250 / SQFT + 18% GST',
        scopeSummary: 'Includes full POP decorative false ceilings, cornices, and moldings (₹90-125/sqft value), Jaquar luxury wall-hung commode suite (₹7,000-10,000), large format 2x4 glazed vitrified tiles (₹60-80/sqft), natural polished marble (₹100-120/sqft), Century Ply/Advance flush doors with Godrej locks, 1,000L Sintex tank, and premium washable emulsion.'
      }
    ],
    inclusions: [
      'Complete civil structural framework from foundation to roof slab',
      'All exterior perimeter walls (9-inch) and internal room partitions (4.5-inch)',
      'Full interior and exterior cement plastering with smooth float finish',
      'Concealed electrical conduit layout, FRLS copper wires, and modular switch plates',
      'Concealed internal hot/cold water supply and sanitary drainage network',
      'Flooring tiles, marble, granite platforms, and full stair treads with molding',
      'Hardwood door frames, flush door shutters, UPVC windows, and MS main entrance gate',
      'Stainless steel staircase railing and MS balcony railings',
      'Two coats of wall putty, primer, and double-coat emulsion painting'
    ],
    exclusions: [
      'Garden and landscaping (grass, plants, garden sprinkler lines)',
      'External compound boundary wall and pillar caps (estimated separately on linear running foot basis)',
      'Special elevation features like pergolas, louvers, or exterior wooden ACP canopies',
      'Decorative lighting fixtures, tube lights, fans, chandeliers, and exhaust fans',
      'Air conditioning (AC) units and copper refrigerant piping',
      'Loose furniture, wardrobes, beds, and modular kitchen wooden cabinetry',
      'Elevator / lift machine and shaft operating equipment',
      'Deep borewell boring and submersible pump installation',
      'Main electrical power line from utility pole to site meter board',
      'Site electricity and water consumption during the construction phase (provided by property owner)'
    ],
    faqs: [
      {
        question: 'What is included in residential turnkey construction by M/S Abdul Salam Constructions Company?',
        answer: 'Depending on the quotation package selected, residential turnkey construction includes Brick Works, RCC Works, Shuttering Works, Plastering Works, Electrical Works, Plumbing Works, Flooring Works, Wood and MS Works, Railing Works, and POP/Painting Works. All structural labor, materials, supervision, and site logistics are covered.'
      },
      {
        question: 'How are turnkey construction rates calculated?',
        answer: 'Turnkey rates are calculated per square foot of measured built-up slab area plus 18% GST. Under official quotation measurement rules: Slab Area — 100%, Double Slab Area / Do Chhatti — 50%, and Stair Area — 150% (due to specialized shuttering, reinforcement cage, and vertical risers).'
      },
      {
        question: 'What is the stage-by-stage payment schedule for turnkey projects?',
        answer: 'Payments follow a verified 7-stage milestone schedule: Stage 1: 20% on booking and contract signing; Stage 2: 10% on plinth level completion; Stage 3: 15% on column casting till beam bottom; Stage 4: 10% on brick masonry / retaining walls; Stage 5: 20% on RCC roof slab casting; Stage 6: 5% on plaster work completion; Stage 7: 20% on final finishing, fittings, and key handover.'
      }
    ],
    relatedServiceSlugs: ['building-construction', 'rcc-works', 'brick-work', 'flooring-stone-tiling'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },

  'building-construction': {
    slug: 'building-construction',
    title: 'Building Construction & Civil Works',
    shortTitle: 'Civil Works',
    serviceEntity: 'Building Construction & Civil Works',
    category: 'Secondary Commercial Service Entity',
    heroBadge: 'Core Civil Engineering',
    metaTitle: 'Building Construction & Civil Works in Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj | M/S Abdul Salam Constructions Company',
    metaDescription: 'Building construction and civil works by M/S Abdul Salam Constructions Company. Foundation excavation, PCC bed concrete, RCC framing, load-bearing masonry, and civil contracting.',
    definition: 'Building Construction & Civil Works encompasses the core engineering and structural execution of buildings, including site leveling, deep foundation excavation, anti-termite ground barriers, plain cement concrete (PCC) bed casting, reinforced cement concrete (RCC) columns, beams, lintels, roof slabs, and perimeter masonry.',
    scopeDescription: 'From ground-breaking to structural shell completion, our civil construction practices strictly follow the ratios, material specifications, and quality controls outlined in the official quotation documents.',
    keyDeliverables: [
      'Accurate site layout, grid marking, and topographical foundation alignment',
      'Foundation excavation down to load-bearing soil strata',
      'Anti-termite barrier treatment applied across the plinth footing footprint',
      'PCC bed concrete pour in 8:5:1 ratio (aggregates 8, sand 5, cement 1)',
      'Reinforced concrete isolated footings and plinth tie-beam casting in 3:2:1 ratio',
      'Column casting till bottom of beam level using 3:2:1 concrete mix with 30+10mm aggregates',
      'Beam shuttering and reinforcement cage fabrication with Fe 550D TMT rebars',
      'Roof slab casting with 3:2:1 concrete mix and 20+10mm graded aggregates',
      'Load-bearing 9-inch exterior perimeter brickwork in 6:1 cement mortar',
      'Interior 4.5-inch partition wall masonry in 5:1 cement mortar'
    ],
    specifications: [
      { label: 'Foundation PCC Ratio', specification: 'Ratio 8:5:1 (Aggregates 20mm & 40mm - 8, Sand - 5, Cement - 1)', notes: 'Bed concrete for foundation stability' },
      { label: 'RCC Concrete Ratio', specification: 'Ratio 3:2:1 (Aggregates 20+10mm or 30+10mm - 3, Sand - 2, Cement - 1)', notes: 'Engineered mix for footings, beams, columns, and slabs' },
      { label: 'Steel Reinforcement', specification: 'Fe 550D High-Ductility TMT Bar', brandOrGrade: 'Tata / Jindal / Kamdhenu / Captain or equivalent' },
      { label: 'Cement Specified in Quotation', specification: 'Commercial grade OPC/PPC', brandOrGrade: 'UltraTech Weather Plus or ACC Gold (\'Not for Sale\')' }
    ],
    packageComparison: [
      {
        packageName: 'Open Hall Quotation Scope',
        rate: '₹1,500 / SQFT + 18% GST',
        scopeSummary: 'Heavy RCC 3:2:1 frame, 8:5:1 PCC, Awwal brickwork, and basic civil shell ideal for open-span commercial halls or godowns.'
      },
      {
        packageName: 'Residential Building Quotation Scope',
        rate: '₹1,850 - ₹2,250 / SQFT + 18% GST',
        scopeSummary: 'Complete multi-floor civil structure with integrated MEP chases, molded staircase steps, and high-specification architectural finishes.'
      }
    ],
    inclusions: [
      'Excavation and foundation bed concrete (PCC 8:5:1)',
      'RCC columns, beams, lintels, chajjas, and roof slabs (3:2:1 ratio)',
      'Waterproof plywood shuttering with heavy balli and patra supports',
      '9-inch exterior and 4.5-inch interior Awwal brick masonry',
      'External and internal cement plastering (15mm rough and 10mm fine)'
    ],
    exclusions: [
      'Earth/soil filling for plinth backfill (provided by property owner)',
      'Temporary construction water and electricity (provided by property owner)',
      'Deep tube well / borewell drilling and pump sets',
      'External compound boundary wall'
    ],
    faqs: [
      {
        question: 'Does the company provide civil construction for commercial buildings and halls?',
        answer: 'Yes. M/S Abdul Salam Constructions Company provides civil construction for commercial halls, open-span retail structures, and multi-storey residential buildings at quotation-specified rates.'
      },
      {
        question: 'What concrete mix is used for structural civil works?',
        answer: 'As specified in the official quotation, an engineered 3:2:1 concrete ratio is utilized for foundations, columns, beams, and roof slabs, combining 3 parts graded stone aggregates (20+10mm for slabs, 30+10mm for columns/foundations), 2 parts coarse sand, and 1 part cement.'
      }
    ],
    relatedServiceSlugs: ['residential-turnkey-construction', 'rcc-works', 'brick-work', 'shuttering-works'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
  },

  'brick-work': {
    slug: 'brick-work',
    title: 'Brick Works & Masonry',
    shortTitle: 'Brick Works',
    serviceEntity: 'Brick Works',
    category: 'Quotation Core Service 01',
    heroBadge: 'Masonry Engineering',
    metaTitle: 'Brick Works & Masonry Construction | M/S Abdul Salam Constructions Company',
    metaDescription: 'First-class Awwal brickwork and masonry by M/S Abdul Salam Constructions Company. 9-inch perimeter walls (6:1 mortar), 4.5-inch partition walls (5:1 mortar), and 8:5:1 PCC.',
    definition: 'Brick Works comprises the precision laying and bonding of kiln-burned red clay bricks with cement-sand mortar to construct load-bearing perimeter walls, internal room partitions, foundation masonry, and window/door openings.',
    scopeDescription: 'All brickwork is executed using first-class Awwal red clay bricks known for sharp geometric edges, uniform compressive strength, and zero efflorescence, bonded with strictly monitored cement-sand mortar ratios.',
    keyDeliverables: [
      'First-class Awwal kiln-burned red bricks with sharp edges and uniform color',
      'PCC bed concrete in 8:5:1 ratio (aggregates 20mm & 40mm - 8, sand - 5, cement - 1)',
      '9-inch exterior perimeter brick masonry laid in 6:1 cement-sand mortar ratio',
      '4.5-inch interior partition wall brickwork laid in 5:1 cement-sand mortar ratio',
      'Continuous vertical and horizontal plumb-line alignments for plumb walls',
      'Adequate water curing of brick masonry for structural strength development'
    ],
    specifications: [
      { label: 'Brick Quality (Eeta)', specification: 'Awwal (1st Class Red Brick)', brandOrGrade: 'Kiln-Burned Local Awwal with sharp edges and high compressive strength' },
      { label: '9-Inch Brickwork Mortar', specification: 'Ratio 6:1', notes: 'Sand - 6 parts, Cement - 1 part' },
      { label: '4.5-Inch Brickwork Mortar', specification: 'Ratio 5:1', notes: 'Sand - 5 parts, Cement - 1 part' },
      { label: 'Bed Concrete PCC', specification: 'Ratio 8:5:1', notes: 'Aggregates (20mm & 40mm) - 8, Sand - 5, Cement - 1' },
      { label: 'Mortar Sand', specification: 'Medium / Super Medium Red Sand (Morang)', notes: 'Clean screened riverbed sand' }
    ],
    packageComparison: [
      {
        packageName: 'All Turnkey Packages (₹1500, ₹1850, ₹2250)',
        rate: 'Standard Specification Across All Packages',
        scopeSummary: 'Awwal 1st Class bricks with 6:1 mortar for 9-inch walls, 5:1 mortar for 4.5-inch walls, and 8:5:1 PCC bed concrete are standard across all three quotation tiers.'
      }
    ],
    inclusions: [
      'Supply of first-class Awwal red clay bricks',
      'Cement and screened medium/super medium red sand (morang)',
      'Masonry labor, plumb verification, scaffolding, and mortar mixing',
      'Curing of freshly laid brick walls'
    ],
    exclusions: [
      'AAC lightweight blocks unless mutually agreed in custom specification',
      'Decorative exposed face brickwork requiring specialized pointing'
    ],
    faqs: [
      {
        question: 'What quality of bricks is used in the construction?',
        answer: 'As specified in the official quotation, first-class Awwal red clay bricks are used for all masonry works. These bricks have sharp edges, high compressive strength, and ringing sound upon impact.'
      },
      {
        question: 'What mortar ratios are used for 9-inch and 4.5-inch walls?',
        answer: 'As per the quotation specifications: 9-inch walls are laid in a 6:1 mortar ratio (6 parts sand to 1 part cement), while 4.5-inch partition walls are laid in a richer 5:1 mortar ratio (5 parts sand to 1 part cement) for added tensile bonding.'
      }
    ],
    relatedServiceSlugs: ['rcc-works', 'plastering-works', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
  },

  'rcc-works': {
    slug: 'rcc-works',
    title: 'RCC Works (Reinforced Cement Concrete Casting)',
    shortTitle: 'RCC Works',
    serviceEntity: 'RCC Works',
    category: 'Quotation Core Service 02',
    heroBadge: 'Structural Concrete',
    metaTitle: 'RCC Concrete Casting & Structural Works | M/S Abdul Salam Constructions Company',
    metaDescription: 'Engineered RCC casting by M/S Abdul Salam Constructions Company. 3:2:1 concrete ratio, Fe 550D TMT rebar, UltraTech/ACC cement for slabs, beams, columns, and foundations.',
    definition: 'RCC Works (Reinforced Cement Concrete Casting) refers to the fabrication and pouring of high-strength concrete combined with steel rebar reinforcement to construct the primary load-bearing skeleton of the building—including foundations, plinth tie beams, columns, lintels, and roof slabs (dhhalai).',
    scopeDescription: 'All structural concrete is poured using an engineered 3:2:1 ratio (aggregates 3, sand 2, cement 1) with primary mill Fe 550D high-ductility TMT rebars and commercial-grade UltraTech or ACC cement.',
    keyDeliverables: [
      'Isolated footing and foundation raft casting in 3:2:1 concrete mix with 30+10mm aggregates',
      'Plinth tie beam reinforcement binding and concrete pouring',
      'RCC column casting till bottom of beam level with 30+10mm aggregates',
      'Beam and roof slab casting (dhhalai) with 20+10mm graded aggregates',
      'Fe 550D high-ductility TMT steel rebars (Tata, Jindal, Kamdhenu, Captain or equivalent)',
      'M-20 / 20mm steel rebar specification for structural slabs',
      'High-frequency mechanical vibration to eliminate air voids and honeycombing',
      'Systematic water curing of cast slabs, columns, and beams'
    ],
    specifications: [
      { label: 'Slab (Dhhalai) Concrete Mix', specification: 'Ratio 3:2:1 (Aggregates 20+10mm - 3, Sand - 2, Cement - 1)', notes: 'Bar (Sariya) (M-20)/20mm Fe 550D' },
      { label: 'Beam Concrete Mix', specification: 'Ratio 3:2:1 (Aggregates 20+10mm - 3, Sand - 2, Cement - 1)', notes: 'Structural longitudinal and stirrup cages' },
      { label: 'Column Concrete Mix', specification: 'Ratio 3:2:1 (Aggregates 30+10mm - 3, Sand - 2, Cement - 1)', notes: 'Poured till bottom of beam level' },
      { label: 'Foundation (Footing & Raft)', specification: 'Ratio 3:2:1 (Aggregates 30+10mm - 3, Sand - 2, Cement - 1)', notes: 'Engineered isolated or combined footings' },
      { label: 'Cement Brand & Grade', specification: 'UltraTech Weather Plus or ACC Gold', brandOrGrade: '\'Not for Sale\' Industrial Commercial Grade' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'RCC 3:2:1 Mix',
        scopeSummary: 'Fe 550D TMT rebars, UltraTech/ACC cement, 20+10mm & 30+10mm aggregates for commercial hall foundation and roof slabs.'
      },
      {
        packageName: 'Residential Building Quotations (₹1850 & ₹2250/sqft)',
        rate: 'RCC 3:2:1 Mix with Fe 550D (Tata/Jindal)',
        scopeSummary: 'Enhanced multi-floor column casting, beam bottoms, cantilevers, chajjas, and roof slabs with Tata/Jindal Fe 550D steel rebars.'
      }
    ],
    inclusions: [
      'Graded blue metal aggregates (20mm, 10mm, 30mm)',
      'Coarse river red sand (morang)',
      'Commercial-grade UltraTech or ACC cement',
      'Fe 550D TMT steel bars and binding wire',
      'Concrete mixer machine, vibrator, and pouring labor',
      'Water ponding and continuous curing'
    ],
    exclusions: [
      'Deep pile foundations requiring hydraulic rig boring (estimated separately if weak soil is discovered)',
      'Ready-Mix Concrete (RMC) transit mixers unless mutually agreed in contract'
    ],
    faqs: [
      {
        question: 'What steel rebar grade is used for RCC slab and column casting?',
        answer: 'As specified in the quotation, Fe 550D high-ductility TMT rebars (Tata, Jindal, Kamdhenu, Captain or equivalent) are used for all structural RCC works, including 20mm rebar specifications for structural slabs.'
      },
      {
        question: 'Which cement brands are specified for RCC dhalai?',
        answer: 'The quotation specifies commercial-grade UltraTech Weather Plus or ACC Gold (\'Not for Sale\' industrial packaging) for all casting, foundation, and slab pours.'
      }
    ],
    relatedServiceSlugs: ['shuttering-works', 'brick-work', 'building-construction'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
  },

  'shuttering-works': {
    slug: 'shuttering-works',
    title: 'Shuttering Works & Formwork',
    shortTitle: 'Shuttering',
    serviceEntity: 'Shuttering Works',
    category: 'Quotation Core Service 03',
    heroBadge: 'Formwork Staging',
    metaTitle: 'Shuttering Works & Formwork Staging | M/S Abdul Salam Constructions Company',
    metaDescription: 'Waterproof plywood shuttering, balli, and patra staging by M/S Abdul Salam Constructions Company for slab heights between 8 to 12 feet.',
    definition: 'Shuttering Works encompasses the temporary formwork, molds, and structural staging erected to support freshly poured concrete during RCC foundation, column, beam, and slab casting until the concrete achieves structural self-support strength.',
    scopeDescription: 'We utilize waterproof plywood shuttering backed by heavy balli, steel tubular props, and patra plates to maintain clear floor-to-slab heights of 8 to 12 feet without sag or deflection.',
    keyDeliverables: [
      'Waterproof film-faced plywood shuttering plates for smooth slab soffits',
      'Heavy structural balli and patra props providing rigid vertical support',
      'Precision laser / water leveling to eliminate slab curvature and deflection',
      'Formwork designed for clear floor-to-slab heights between 8 feet to 12 feet',
      'Column box shuttering with tight corner clamps to prevent slurry leakage',
      'Safe de-shuttering following standard civil engineering curing intervals'
    ],
    specifications: [
      { label: 'Shuttering Material', specification: 'Waterproof Plywood Shuttering', notes: 'Smooth, leak-proof formwork surface' },
      { label: 'Staging & Propping Support', specification: 'Balli & Patra', notes: 'Standard heavy structural support with cross-bracing' },
      { label: 'Clear Slab Height Range', specification: '8 Feet to 12 Feet', notes: 'Maintained as per quotation clause 5 and structural drawings' }
    ],
    packageComparison: [
      {
        packageName: 'Standard Across All Packages (₹1500, ₹1850, ₹2250)',
        rate: 'Included in Base Turnkey Rate',
        scopeSummary: 'Waterproof plywood formwork with heavy structural props for heights up to 12 feet is standard across all packages.'
      }
    ],
    inclusions: [
      'Supply and transport of shuttering plywood, patra, and balli props',
      'Erection, plumb alignment, and rigid bracing of formwork',
      'De-shuttering after mandatory concrete setting periods'
    ],
    exclusions: [
      'Extraordinary staging heights exceeding 14 feet unless quoted in architectural agreement',
      'Complex curved architectural formwork requiring specialized CNC foam molds'
    ],
    faqs: [
      {
        question: 'What type of shuttering is used for roof slab casting?',
        answer: 'The quotation specifies waterproof plywood shuttering supported by heavy balli and patra staging. This delivers a flat, level ceiling soffit and prevents slurry leakage during vibration.'
      },
      {
        question: 'What is the standard floor-to-slab height maintained by the shuttering?',
        answer: 'As stated in Clause 5 of the quotation terms, a clear floor-to-slab height between 8 feet to 12 feet is maintained according to the approved design.'
      }
    ],
    relatedServiceSlugs: ['rcc-works', 'building-construction', 'plastering-works'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
  },

  'plastering-works': {
    slug: 'plastering-works',
    title: 'Plastering Works',
    shortTitle: 'Plastering',
    serviceEntity: 'Plastering Works',
    category: 'Quotation Core Service 04',
    heroBadge: 'Surface Engineering',
    metaTitle: 'Plastering Works (15mm Rough, 10mm Fine) | M/S Abdul Salam Constructions Company',
    metaDescription: 'Plastering works by M/S Abdul Salam Constructions Company. 15mm external rough plaster, 10mm internal fine sponge plaster, and 7mm ceiling plaster in 6:1 mortar ratio.',
    definition: 'Plastering Works involves applying calibrated cement-sand mortar layers onto rough brick masonry and RCC surfaces to seal the building envelope, create level planes, and provide a durable substrate for paint and tile finishes.',
    scopeDescription: 'We execute multi-thickness plastering: 15mm external rough plaster for weather defense, 10mm internal fine sponge-finish plaster, and 7mm ceiling plaster where required, all mixed in a 6:1 cement-sand ratio.',
    keyDeliverables: [
      '15 mm thickness rough/external plaster in 6:1 mortar ratio (sand 6 parts, cement 1 part)',
      '10 mm thickness fine/internal plaster in 6:1 mortar ratio with smooth sponge floating',
      '7 mm thickness ceiling plaster in 6:1 mortar ratio where specified',
      'Clean screened medium and super-medium silt-free red sand (morang)',
      'High-adhesion PPC/OPC cement from UltraTech or ACC (\'Not for Sale\' grade)',
      'Straight-edge and plumb leveling for perfectly square wall corners',
      'Minimum water curing to eliminate shrinkage micro-cracking'
    ],
    specifications: [
      { label: 'External Rough Plaster', specification: '15 mm Thickness (Ratio 6:1)', notes: 'Sand - 6 parts, Cement - 1 part' },
      { label: 'Internal Fine Plaster', specification: '10 mm Thickness (Ratio 6:1)', notes: 'Sand - 6 parts, Cement - 1 part, smooth sponge finish' },
      { label: 'Ceiling Plaster (If needed)', specification: '7 mm Thickness (Ratio 6:1)', notes: 'Sand - 6 parts, Cement - 1 part' },
      { label: 'Cement Brand', specification: 'UltraTech or ACC', brandOrGrade: '\'Not for Sale\' Grade' },
      { label: 'Sand Specification', specification: 'Medium / Super Medium Red Sand (Morang)', notes: 'Screened silt-free sand' }
    ],
    packageComparison: [
      {
        packageName: 'All Turnkey Packages (₹1500, ₹1850, ₹2250)',
        rate: 'Standard Specification',
        scopeSummary: '15mm external rough plaster and 10mm internal fine sponge plaster in 6:1 mortar ratio are standard across all three quotation packages.'
      }
    ],
    inclusions: [
      'Screened sand and cement mixing in 6:1 ratio',
      'Internal fine sponge finishing and external rough finishing',
      'Scaffolding, corner beads, and water curing'
    ],
    exclusions: [
      'Textured designer plaster coatings outside standard smooth sponge finish',
      'Gypsum plaster spray application unless specified as alternative'
    ],
    faqs: [
      {
        question: 'What is the mortar ratio used for plastering?',
        answer: 'The quotation specifies a 6:1 mortar ratio (6 parts clean red sand to 1 part cement) for both 15mm external rough plaster and 10mm internal fine sponge plaster.'
      },
      {
        question: 'How thick is the plaster on interior and exterior walls?',
        answer: 'As per the quotation specification, external walls receive 15mm rough-side plaster for weather defense, interior walls receive 10mm fine-side sponge plaster, and ceilings receive 7mm plaster where needed.'
      }
    ],
    relatedServiceSlugs: ['painting-pop-works', 'brick-work', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80'
  },

  'electrical-works': {
    slug: 'electrical-works',
    title: 'Electrical Works & Conduiting',
    shortTitle: 'Electrical Works',
    serviceEntity: 'Electrical Works',
    category: 'Quotation Core Service 05',
    heroBadge: 'MEP Conduiting',
    metaTitle: 'Concealed Electrical Works & Wiring | M/S Abdul Salam Constructions Company',
    metaDescription: 'Electrical works by M/S Abdul Salam Constructions Company. Heavy roof conduits, medium wall conduits, FRLS copper wiring (RR Kabel/Havells/Polycab), and modular switches.',
    definition: 'Electrical Works covers the complete concealed conduit piping, fire-retardant electrical wiring, modular distribution boxes, switches, sockets, and fan regulators installed throughout the building.',
    scopeDescription: 'All electrical conduits are embedded in roof slabs during shuttering and in brick chases before plastering, utilizing heavy-duty PVC conduits and multi-strand FRLS copper wires from approved manufacturers.',
    keyDeliverables: [
      'Heavy PVC conduit piping for roof slabs (estimated at approx. ₹70-75/m in quotation)',
      'Medium PVC conduit piping for brick wall chases (estimated at approx. ₹45-50/m in quotation)',
      'FRLS (Fire Retardant Low Smoke) multi-strand copper wiring (RR Kabel, Havells, Polycab or equivalent)',
      'Modular switches, 3-pin sockets, and fan regulators (RR Kabel, Havells, Anchor Roma or equivalent)',
      'Concealed metal junction boxes and distribution panels installed wherever needed',
      'Separation of power circuits for heavy appliances and lighting circuits'
    ],
    specifications: [
      { label: 'Roof Conduit Pipe', specification: 'Heavy PVC Conduit', notes: 'Approx. ₹70-75/m (Any approved brand / Owner choice)' },
      { label: 'Wall Conduit Pipe', specification: 'Medium PVC Conduit', notes: 'Approx. ₹45-50/m (Concealed in brick chases)' },
      { label: 'Electrical Wires', specification: 'FRLS Copper Multi-Strand', brandOrGrade: 'RR Kabel (FRLS) / Havells / Polycab / Anchor' },
      { label: 'Modular Switches & Sockets', specification: 'Modular 3-Pin Sockets, Switches, Regulators', brandOrGrade: 'RR Kabel / Havells / Anchor Roma' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Core Electrical Layout',
        scopeSummary: 'Heavy roof and medium wall conduits, FRLS copper wiring, and standard modular switches for open halls.'
      },
      {
        packageName: 'Standard Quotation (₹1850/sqft)',
        rate: 'Residential Modular Layout',
        scopeSummary: 'Comprehensive room-by-room modular layout with RR Kabel (FRLS) / Havells / Anchor wiring and modular plates.'
      },
      {
        packageName: 'Premium Quotation (₹2250/sqft)',
        rate: 'Full Residential Suite',
        scopeSummary: 'Premium multi-strand copper wiring, modular safety grids, and dedicated power lines for AC and geyser points.'
      }
    ],
    inclusions: [
      'Heavy PVC roof conduits and medium wall conduits',
      'FRLS copper wires across lighting, power, and socket loops',
      'Modular switch plates, sockets, and fan speed regulators',
      'Concealed metal back-boxes and distribution board conduit links'
    ],
    exclusions: [
      'Tube lights, ceiling fans, decorative light fixtures, and chandeliers (provided by owner)',
      'Air conditioning (AC) units and copper refrigerant piping',
      'Main heavy electrical power panel, auto-changeover, and generator connection links',
      'Main service cable connection from electricity department pole to site meter board'
    ],
    faqs: [
      {
        question: 'Which electrical wire and switch brands are specified?',
        answer: 'The quotation specifies FRLS (Fire Retardant Low Smoke) copper wires from RR Kabel, Havells, Polycab, or Anchor, paired with modular switches and sockets from RR Kabel, Havells, or Anchor Roma.'
      },
      {
        question: 'Are fans and tube lights included in the turnkey electrical package?',
        answer: 'No. As clearly listed in the quotation exclusions, tube lights, fans, decorative lighting, exhaust fans, chandeliers, and air conditioning units are excluded and provided by the property owner.'
      }
    ],
    relatedServiceSlugs: ['plumbing-works', 'painting-pop-works', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
  },

  'plumbing-works': {
    slug: 'plumbing-works',
    title: 'Plumbing, Drainage & Sanitary Works',
    shortTitle: 'Plumbing Works',
    serviceEntity: 'Plumbing Works',
    category: 'Quotation Core Service 06',
    heroBadge: 'Sanitary Engineering',
    metaTitle: 'Plumbing & Sanitary Works | M/S Abdul Salam Constructions Company',
    metaDescription: 'Plumbing and sanitary works by M/S Abdul Salam Constructions Company. Astral/Supreme pipes, Jaquar/Cera commodes & taps, Sintex overhead water tank.',
    definition: 'Plumbing, Drainage & Sanitary Works covers the supply, concealment, and testing of cold and hot water pipelines, soil/waste drainage channels, sanitary commodes, washbasins, chrome-plated taps, and overhead water storage tanks.',
    scopeDescription: 'We install heavy-duty UPVC and CPVC piping from Astral or Supreme, paired with branded sanitaryware suites (Jaquar or Cera) and Sintex PU-insulated overhead water tanks according to package specifications.',
    keyDeliverables: [
      'Sewer line PVC pipes in 5" and 4" diameter with 5 kg & 6 kg/cm² pressure ratings (Astral, Supreme or equivalent)',
      'Waste water drainage lines with cleanout traps and proper fall slope',
      'Internal water supply lines in 0.75", 1", and 1.5" UPVC & CPVC (Astral, Supreme or equivalent)',
      'Washroom sanitary fittings: Western or Indian commode, washbasin, angle valves, bib cocks, and shower',
      'Master bedroom mixer shower suite including 2-tap washbasin diverter',
      'Chrome-plated solid brass taps and diverters (Jaquar or Cera)',
      'Sintex PU-insulated overhead water storage tank (500 Litre or 1,000 Litre capacity)'
    ],
    specifications: [
      { label: 'Sewer & Waste Lines', specification: '5" & 4" PVC (6 kg & 5 kg pressure)', brandOrGrade: 'Astral, Supreme or equivalent' },
      { label: 'Internal Water Piping', specification: '0.75", 1", and 1.5" UPVC & CPVC', brandOrGrade: 'Astral, Supreme or equivalent' },
      { label: 'Commode & Basin Suite', specification: 'Wall-Hung / Floor Mount with Cistern', notes: 'Jaquar in ₹2250 (₹7k-10k) & ₹1850 (₹5.5k-6.5k); Cera in ₹1500 (₹3.5k-4.5k)' },
      { label: 'Taps & CP Fittings', specification: 'Brass Chrome Plated', notes: 'Jaquar in ₹2250 (₹1.5k-1.8k) & ₹1850 (₹1.2k-1.5k); Cera in ₹1500 (₹1.2k-1.5k)' },
      { label: 'Overhead Water Tank', specification: 'Sintex PU Heavy Insulated Tank', notes: '1,000 Litre in ₹2250 package; 500 Litre in ₹1850 and ₹1500 packages' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Core Sanitary Scope',
        scopeSummary: 'Cera Indian/Western commode (₹3,500-4,500 cap), Cera brass CP taps (₹1,200-1,500 cap), Supreme/Astral piping, and 500L Sintex water tank.'
      },
      {
        packageName: 'Standard Residential Quotation (₹1850/sqft)',
        rate: 'Branded Jaquar Suite',
        scopeSummary: 'Jaquar wall-hung commode & basin (₹5,500-6,500 cap), Jaquar brass taps (₹1,200-1,500 cap), master bedroom mixer shower suite, and 500L Sintex tank.'
      },
      {
        packageName: 'Premium Residential Quotation (₹2250/sqft)',
        rate: 'Luxury Jaquar & 1,000L Tank',
        scopeSummary: 'Luxury Jaquar wall-hung commode & countertop basin (₹7,000-10,000 cap), Jaquar CP taps (₹1,500-1,800 cap), master mixer shower, and 1,000L Sintex PU-insulated tank.'
      }
    ],
    inclusions: [
      'Concealed CPVC hot and cold water distribution pipes',
      'PVC soil and waste drainage network with cleanout traps',
      'Sanitaryware commode, cistern, and washbasin suite',
      'Chrome-plated brass bib cocks, angle valves, and shower heads',
      'Overhead Sintex PU water tank with inlet, outlet, and overflow fittings'
    ],
    exclusions: [
      'Deep borewell boring and submersible pump installation (provided by property owner)',
      'Water geysers / water heaters (electrical appliances provided by property owner)',
      'Site external plumbing manholes beyond standard scope',
      'Water meter connection fees from municipal corporation'
    ],
    faqs: [
      {
        question: 'Which pipe and sanitary brands are specified in the quotation?',
        answer: 'The quotation specifies Astral or Supreme for PVC, UPVC, and CPVC piping; Jaquar or Cera for sanitary commodes, washbasins, and chrome-plated brass taps; and Sintex for PU-insulated overhead water tanks.'
      },
      {
        question: 'What water tank capacity is provided?',
        answer: 'A 500 Litre Sintex PU-insulated tank is provided under the ₹1,500 and ₹1,850 quotation packages, while a larger 1,000 Litre Sintex PU tank is provided under the ₹2,250 premium package.'
      }
    ],
    relatedServiceSlugs: ['electrical-works', 'flooring-stone-tiling', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
  },

  'flooring-stone-tiling': {
    slug: 'flooring-stone-tiling',
    title: 'Flooring Works & Stone Tiling',
    shortTitle: 'Flooring & Stone',
    serviceEntity: 'Flooring and Stone Tiling',
    category: 'Quotation Core Service 07',
    heroBadge: 'Stone & Tiling',
    metaTitle: 'Flooring Works, Vitrified Tiles & Marble | M/S Abdul Salam Constructions Company',
    metaDescription: 'Flooring and stone tiling by M/S Abdul Salam Constructions Company. Kajaria/Vermora vitrified tiles, polished marble, molded granite kitchen platform and stairs.',
    definition: 'Flooring Works & Stone Tiling covers the leveling, adhesive bedding, grouting, and polishing of vitrified ceramic tiles, polished natural marble slabs, molded granite kitchen countertops, and granite staircase steps.',
    scopeDescription: 'Materials include branded vitrified tiles (Kajaria / Vermora or equivalent), natural polished marble in dining/family rooms, jet-black granite platforms with machine edge molding, and 4-inch matching perimeter skirting.',
    keyDeliverables: [
      'Drawing room and bedroom vitrified floor tiles (2x2 ft or 2x4 ft from Kajaria / Vermora or equivalent)',
      'Family room and dining hall polished natural marble slabs with fine border trims',
      'Kitchen cooking counter in jet black polished granite with machine edge molding and stainless steel sink',
      'Staircase treads and risers in granite or marble with full bullnose edge molding',
      'Balcony, terrace, and parking areas in anti-skid ceramic/vitrified tiles',
      'Washroom and toilet walls with glazed ceramic wall tiles up to 7 or 8 feet height',
      '4-inch matching tile skirting throughout all rooms'
    ],
    specifications: [
      { label: 'Living & Bedroom Tiles', specification: '2x2 ft or 2x4 ft Vitrified (Kajaria / Vermora)', notes: '₹60-80/sqft (₹2250) | ₹40-60/sqft (₹1850) | ₹35-40/sqft (₹1500)' },
      { label: 'Family & Dining Marble', specification: 'Polished Natural Marble', notes: '₹100-120/sqft (₹2250) | ₹80-100/sqft (₹1850)' },
      { label: 'Kitchen Countertop', specification: 'Jet Black Polished Granite with Full Molding', notes: '₹90-110/sqft (₹2250) | ₹80-90/sqft (₹1850)' },
      { label: 'Staircase Steps & Risers', specification: 'Granite / Marble with Full Edge Molding', notes: '₹70-80/sqft (₹2250) | ₹60-70/sqft (₹1850 & ₹1500)' },
      { label: 'Toilet Wall Tiles', specification: 'Ceramic Glazed Wall Dado (7-8 ft height)', notes: '₹60/sqft (₹2250) | ₹40/sqft (₹1850)' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Vitrified Tiles & Granite Steps',
        scopeSummary: 'Kajaria/Vermora 2x2 vitrified tiles (up to ₹35-40/sqft), granite cooking platform, granite/marble stairs (up to ₹60-70/sqft), and toilet tiles up to 7-8 ft.'
      },
      {
        packageName: 'Standard Residential (₹1850/sqft)',
        rate: 'Vitrified + Marble Dining',
        scopeSummary: '2x2/2x4 vitrified tiles (up to ₹40-60/sqft), polished marble in dining/family room (up to ₹80-100/sqft), and jet black granite kitchen platform (up to ₹80-90/sqft).'
      },
      {
        packageName: 'Premium Residential (₹2250/sqft)',
        rate: 'Large 2x4 Slabs + Luxury Marble',
        scopeSummary: 'Large format 2x4 glazed vitrified tiles (up to ₹60-80/sqft), natural polished marble (up to ₹100-120/sqft), and exotic granite with dual edge molding (up to ₹90-110/sqft).'
      }
    ],
    inclusions: [
      'Cement mortar bed leveling and tile adhesive installation',
      'Tile spacers, color-matched joint grouting, and edge trimming',
      'Machine bullnose edge molding on granite kitchen slab and stair steps',
      '4-inch perimeter skirting across all tiled areas'
    ],
    exclusions: [
      'Imported Italian marble or composite quartz unless selected under custom architectural tier',
      'Epoxy stain-resistant grouting across entire floor plates'
    ],
    faqs: [
      {
        question: 'Which tile brands are specified for floor and wall finishes?',
        answer: 'The quotation specifies Kajaria, Vermora, or equivalent branded vitrified and ceramic tiles with clear rate allowances per square foot based on the chosen package.'
      },
      {
        question: 'Is natural marble included in the construction packages?',
        answer: 'Yes. In both the ₹1,850 and ₹2,250 residential building quotation packages, polished natural marble is specified for the family and dining rooms (with allowances of ₹80-100/sq.ft and ₹100-120/sq.ft respectively).'
      }
    ],
    relatedServiceSlugs: ['wood-ms-works', 'plumbing-works', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  },

  'wood-ms-works': {
    slug: 'wood-ms-works',
    title: 'Wood and MS Works (Joinery & Fabrication)',
    shortTitle: 'Wood & MS Works',
    serviceEntity: 'Wood and MS Works',
    category: 'Quotation Core Service 08',
    heroBadge: 'Joinery & Metal',
    metaTitle: 'Wood & MS Works (Doors, UPVC Windows, Gates) | M/S Abdul Salam Constructions Company',
    metaDescription: 'Wood and MS joinery by M/S Abdul Salam Constructions Company. Hardwood flush doors with Godrej locks, Prominence UPVC windows, and heavy MS entrance gates.',
    definition: 'Wood and MS Works covers the fabrication, joinery, and installation of hardwood door frames, flush door shutters, acoustic UPVC window frames with glass glazing, waterproof bathroom doors, and heavy mild steel (MS) entrance gates.',
    scopeDescription: 'We install premium flush doors (Century Ply, Advance, Shakuntalam, or Black Cherry) fitted with Godrej mortise locks and hardware, acoustic Prominence UPVC sliding windows, and heavy MS box section entrance gates.',
    keyDeliverables: [
      'Hardwood door frames with laminated flush door shutters',
      'Godrej mortise locks, handles, and brass door stoppers',
      'Prominence UPVC sliding/casement windows with 5mm-6mm clear acoustic glass',
      'Waterproof UPVC or heavy aluminum section washroom doors',
      'Heavy mild steel (MS) box section entrance gate (Tata / Jindal steel) with locking hardware'
    ],
    specifications: [
      { label: 'Door Frames & Shutters', specification: 'Hardwood Frame with Flush Door', notes: 'Ply: Century or Advance (₹2250) | Shakuntalam / Black Cherry (₹1850)' },
      { label: 'Door Hardware & Locks', specification: 'Godrej Mortise Locks & Accessories', notes: 'Lock, handle, stopper with medium-range hardware' },
      { label: 'Windows & Glazing', specification: 'Prominence UPVC with 5-6mm Clear Glass', notes: '₹550-750/sqft (₹2250) | ₹450-550/sqft (₹1850 & ₹1500)' },
      { label: 'Toilet / Washroom Doors', specification: 'UPVC / Heavy Aluminium Waterproof', notes: 'Moisture-resistant with lock hardware' },
      { label: 'Main Entrance Gate', specification: 'Heavy MS Box Frame (Tata / Jindal)', notes: 'With anti-corrosive primer and enamel finish' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Core MS & UPVC Scope',
        scopeSummary: 'Prominence UPVC windows (up to ₹450-550/sqft), waterproof washroom doors, and heavy MS entrance gate.'
      },
      {
        packageName: 'Standard Residential (₹1850/sqft)',
        rate: 'Shakuntalam Ply + Godrej Locks',
        scopeSummary: 'Shakuntalam or Black Cherry flush doors with Godrej locks, Prominence UPVC windows (₹450-550/sqft), and MS main gate.'
      },
      {
        packageName: 'Premium Residential (₹2250/sqft)',
        rate: 'Century / Advance Ply + Heavy UPVC',
        scopeSummary: 'Century Ply or Advance flush doors with Godrej locks, Prominence UPVC windows (₹550-750/sqft allowance), and heavy MS architectural gate.'
      }
    ],
    inclusions: [
      'Supply and fitting of hardwood frames and flush doors',
      'Godrej mortise lock hardware, handles, and stoppers',
      'Prominence UPVC window fabrication and 5-6mm glass glazing',
      'MS box section main entrance gate fabrication and mounting'
    ],
    exclusions: [
      'Modular kitchen wooden cabinets, wardrobes, and loose furniture',
      'Motorized automatic gate openers'
    ],
    faqs: [
      {
        question: 'Which brands of doors and windows are specified?',
        answer: 'The quotation specifies Century Ply or Advance flush doors for the ₹2,250 package, Shakuntalam or Black Cherry for the ₹1,850 package, Godrej locks and hardware, and Prominence UPVC windows with 5-6mm clear acoustic glass.'
      },
      {
        question: 'What material is used for the main entrance gate?',
        answer: 'A heavy mild steel (MS) box section frame fabricated using Tata or Jindal structural steel sections, fitted with locking hardware and finished with anti-rust primer and enamel paint.'
      }
    ],
    relatedServiceSlugs: ['railing-works', 'painting-pop-works', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },

  'railing-works': {
    slug: 'railing-works',
    title: 'Railing Works (MS & Stainless Steel)',
    shortTitle: 'Railing Works',
    serviceEntity: 'Railing Works',
    category: 'Quotation Core Service 09',
    heroBadge: 'Safety Fabrication',
    metaTitle: 'Railing Works (Stainless Steel & MS) | M/S Abdul Salam Constructions Company',
    metaDescription: 'Railing works by M/S Abdul Salam Constructions Company. Grade 204/304 stainless steel stair railings and mild steel (MS) balcony railings with finished molded joints.',
    definition: 'Railing Works comprises the structural fabrication, grinding, welding, molding, and installation of safety balustrades and handrails for internal staircases, external balconies, and rooftop parapet walls.',
    scopeDescription: 'We fabricate stainless steel (Grade 204 / 304) stair railings with seamless mirror/satin finishes and molded handrails, alongside heavy mild steel (MS) box and flat railings for balconies and boundary walls.',
    keyDeliverables: [
      'Stainless steel stair railing in Grade 204 or Grade 304 (Tata / Jindal or equivalent)',
      'Seamless mirror-polished finish with molded ergonomic handrail profiles',
      'Mild steel (MS) box and flat structural section railing for balconies and boundary walls',
      'Finished and molded joints with full penetration welds',
      'Anti-rust primer basecoat and double-coat synthetic enamel paint on all MS railing fabrications'
    ],
    specifications: [
      { label: 'Staircase Railing', specification: 'Stainless Steel Grade 204 / 304', brandOrGrade: 'Tata / Jindal or equivalent with polished finish and molded handrail' },
      { label: 'Balcony & Boundary Railing', specification: 'MS Box and Flat Structural Sections', brandOrGrade: 'Tata / Jindal or equivalent with finished and molded joints' },
      { label: 'MS Railing Coating', specification: 'Anti-Rust Primer + Double Coat Enamel Paint', brandOrGrade: 'Asian Paints / Nerolac' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Grade 204 SS & MS Scope',
        scopeSummary: 'Grade 204 stainless steel stair railing and heavy MS box section balcony railing.'
      },
      {
        packageName: 'Standard Residential (₹1850/sqft)',
        rate: 'Finished Grade 204 SS',
        scopeSummary: 'Grade 204 SS stair railing with molded bends and MS flat/box balcony railings.'
      },
      {
        packageName: 'Premium Residential (₹2250/sqft)',
        rate: 'Grade 204 / 304 SS Suite',
        scopeSummary: 'Grade 204/304 stainless steel finished railing with seamless polished bends and heavy MS balustrades.'
      }
    ],
    inclusions: [
      'Supply of stainless steel pipes, balusters, and handrails',
      'Supply of MS box sections and flat bars',
      'Welding, grinding, buffing, and anchor bolting into concrete',
      'Anti-corrosive primer and enamel painting on all MS metalwork'
    ],
    exclusions: [
      'Frameless toughened glass railing profiles unless specified under custom architectural tier'
    ],
    faqs: [
      {
        question: 'What steel grade is used for staircase railings?',
        answer: 'The quotation specifies Grade 204 / Grade 304 stainless steel with seamless polished finishes and molded handrails for all staircase balustrades.'
      },
      {
        question: 'How are MS balcony railings protected against rust?',
        answer: 'All mild steel railings receive an anti-rust primer basecoat followed by two coats of synthetic enamel paint (Nerolac or Asian Paints) in the color chosen by the owner.'
      }
    ],
    relatedServiceSlugs: ['wood-ms-works', 'flooring-stone-tiling', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },

  'painting-pop-works': {
    slug: 'painting-pop-works',
    title: 'POP, False Ceiling and Painting Works',
    shortTitle: 'Painting & POP',
    serviceEntity: 'POP and Painting Works',
    category: 'Quotation Core Service 10',
    heroBadge: 'Surface Finishing',
    metaTitle: 'POP False Ceiling & Painting Works | M/S Abdul Salam Constructions Company',
    metaDescription: 'POP false ceiling and painting works by M/S Abdul Salam Constructions Company. Double-coat putty, Nerolac/Asian washable emulsion, POP cornices, and enamel paints.',
    definition: 'POP, False Ceiling and Painting Works encompasses the application of decorative Plaster of Paris (POP) designs, cornices, moldings, double-coat acrylic wall putty, primer basecoats, and washable emulsion paint across interior and exterior surfaces.',
    scopeDescription: 'We apply two coats of acrylic wall putty, primer, and washable emulsion paint from Asian Paints or Nerolac, alongside designer POP false ceilings, cornices, and moldings (included under the ₹2,250 premium package).',
    keyDeliverables: [
      'POP decorative ceiling, wall, cornice, and molding work (Nerolac, Asian Paints or equivalent, valued up to ₹90-125/sq.ft in ₹2250 package)',
      'Double-coat wall putty and smooth primer basecoat across all plastered surfaces',
      'Double-coat washable interior emulsion paint on walls and ceilings (Asian Paints / Nerolac)',
      'Primer plus double-coat putty and paint on wooden doors and window frames',
      'Anti-rust primer plus double-coat synthetic enamel paint on MS main entrance gates, window grills, and railings',
      'Paint shade and color palette selected by the property owner'
    ],
    specifications: [
      { label: 'POP False Ceiling & Molding', specification: 'Ceiling, Wall, Cornice & Moldings', notes: 'Included in ₹2250 (up to ₹90-125/sqft value); Optional add-on in ₹1850' },
      { label: 'Wall & Ceiling Paint', specification: 'Double Coat Putty + Emulsion', notes: '₹5,000-7,000/bucket (₹2250) | ₹4,500-6,500/bucket (₹1850 & ₹1500)' },
      { label: 'Door & Window Paint', specification: 'Primer + Double Coat Putty & Paint', notes: 'Colour chosen by owner' },
      { label: 'MS Metal Enamel Paint', specification: 'Anti-Rust Primer + Double Coat Enamel', notes: 'Applied on MS gate, grills, and railings' },
      { label: 'Paint Brands Specified in Quotation', specification: 'Asian Paints or Nerolac (or equivalent)', notes: 'Washable interior and weather-shield exterior formulations' }
    ],
    packageComparison: [
      {
        packageName: 'Hall Quotation (₹1500/sqft)',
        rate: 'Putty + Emulsion Paint',
        scopeSummary: 'Double-coat wall putty, primer, and Asian Paints / Nerolac emulsion (₹4,500-6,500/bucket cap). POP is not included.'
      },
      {
        packageName: 'Standard Residential (₹1850/sqft)',
        rate: 'Putty + Premium Emulsion',
        scopeSummary: 'Double-coat acrylic putty, primer, and Asian Paints / Nerolac washable emulsion for walls, ceilings, and woodwork. POP is an optional add-on.'
      },
      {
        packageName: 'Premium Residential (₹2250/sqft)',
        rate: 'Designer POP Included + Luxury Paint',
        scopeSummary: 'Full POP false ceiling, cornices, and decorative moldings (up to ₹90-125/sqft value), double-coat putty, and luxury washable emulsion (₹5,000-7,000/bucket cap).'
      }
    ],
    inclusions: [
      'Two coats of acrylic wall putty and smooth sanding',
      'Primer basecoat across all plastered walls and ceilings',
      'Two coats of washable emulsion paint (Asian Paints / Nerolac)',
      'Double-coat enamel painting on MS main gate, window grills, and railings',
      'POP decorative ceiling, wall, and cornice work (under ₹2,250 package)'
    ],
    exclusions: [
      'Wallpaper, stencil textures, and imported metallic wall glazes outside standard scope',
      'Special 3D designer ceiling paneling (billed on actuals if requested by owner)'
    ],
    faqs: [
      {
        question: 'Is POP false ceiling included in all construction packages?',
        answer: 'No. As specified in the quotation documents, POP false ceilings, cornices, and moldings (valued up to ₹90-125/sq.ft) are included in the ₹2,250 Premium package. In the ₹1,850 Standard package, POP is an optional add-on, and it is excluded from the ₹1,500 Hall package.'
      },
      {
        question: 'Which paint brands are used for wall and metal finishes?',
        answer: 'The quotation specifies Asian Paints or Nerolac for all wall putty, interior washable emulsions, exterior weather coatings, and synthetic enamel on mild steel gates and railings.'
      }
    ],
    relatedServiceSlugs: ['plastering-works', 'wood-ms-works', 'residential-turnkey-construction'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  }
};
