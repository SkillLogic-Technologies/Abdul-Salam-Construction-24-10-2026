export interface CompanyConfig {
  name: string;
  brandName: string;
  tagline: string;
  gstin: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullAddress: string;
    landmark: string;
  };
  contact: {
    phone: string | null;
    phoneAlt: string | null;
    projectHotline: string | null;
    phoneDisplay: string;
    email: string | null;
    emailDisplay: string;
    whatsapp: string | null;
    whatsappDisplay: string;
    website: string;
    officeHours: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  deliverables: string[];
  timeline: string;
  suitableFor: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
}

export interface PackageFeature {
  featureName: string;
  essential: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
  custom: string | boolean;
}

export interface PackageSpecificationSection {
  category: string;
  features: PackageFeature[];
}

export interface CivilWorkCategory {
  id: number;
  name: string;
  rate?: string;
  particulars: {
    item: string;
    specifications: string;
    rate?: string;
    remarks: string;
  }[];
}

export interface MaterialBrandSpecification {
  serialNo: number;
  category: string;
  items: {
    item: string;
    specification: string;
    brand: string;
    remarks?: string;
  }[];
}

export interface ConstructionPackage {
  id: string;
  name: string;
  tier: 'BASIC' | 'BUDGET' | 'STANDARD' | 'PREMIUM';
  ratePerSqFt: number;
  gstRate: string;
  badge?: string;
  tagline: string;
  priceNote: string;
  bestFor: string;
  highlights: string[];
  keyPills?: string[];
  structuredFeatures?: {
    category: string;
    iconName?: string;
    items: { label: string; value: string; cap?: string }[];
  }[];
  specificationsSummary: {
    structure: string;
    flooring: string;
    kitchen: string;
    bathroom: string;
    doorsWindows: string;
    painting: string;
  };
  recommendedFor: string;
  officialPdfRef?: string;
}

export interface PaymentScheduleStage {
  step: string;
  stageName: string;
  percentage: number;
  description: string;
  note?: string;
}

export interface MeasurementRule {
  item: string;
  percentage: number;
  description: string;
}

export interface QuotationClause {
  pointNumber: number;
  english: string;
}

export interface ProjectTimelineStage {
  phase: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Renovation' | 'Villas';
  projectType: string;
  location: string;
  stage: 'Completed' | 'In Progress';
  builtUpArea: string;
  plotSize: string;
  floors: string;
  contractType: 'Cost-Plus' | 'Lump-Sum';
  packageApplied: string;
  completionYear: string;
  image: string;
  gallery: string[];
  overview: string;
  scopeOfWork: string[];
  highlights: string[];
  timeline: ProjectTimelineStage[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  projectType: string;
  quote: string;
  rating: number;
  date: string;
  verifiedLabel: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing' | 'Materials' | 'Service Areas';
}

export interface ServiceArea {
  id: string;
  name: string;
  district: string;
  state: string;
  status: 'Active Coverage' | 'Extended Coverage';
  distanceFromOffice: string;
  landmark: string;
  description: string;
  popularServices: string[];
}
