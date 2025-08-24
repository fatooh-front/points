export type Attachment = {
  name: string;
  url: string;
};
export type Banner = {
  bannerId?: number | string | null;
  bannerName: string;
  title: string;
  arabicTitle: string | null;
  image: string | null;
  arabicImage: string | null;
  englishText: string | null;
  arabicText: string | null;
  objType: string | number;
  objId: string | number;
  objectName?: string;
  notes?: string | null;
};
export type MaintenanceRequest = {
  reqId: number;
  carName: string;
  clientName: string;
  clientPhone: string;
  rqDate: string; // ISO date string (e.g., "2025-07-17")
  reqStatus: number;
  reservationId: number;
  reqComments: string;
  finishDate: string | null; // nullable ISO date string
  finishComments: string | null;
  notes: string;
};
export interface Offer {
  offerId?: number | null;
  offerName: string;
  offerStatus: number;
  offerHome: number;
  offerType: number;
  offerValue: number;

  title: string;
  titleArabic: string;

  description: string;
  descArabic: string;

  details: string;
  detailsArabic: string;

  terms: string;
  termsArabic: string;

  startDate: string; // ISO date string
  endDate: string; // ISO date string

  image: string;

  notes?: string | null;
}
export type Blog = {
  blogId?: number | string | null;
  title: string;
  slug: string;
  shortText?: string | null;
  content?: string | null;
  author?: string | null;
  image?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  tags?: string[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  status?: number;
  notes?: string | null;
};
export type Contact = {
  contactId: any;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  snapchat: string;
  tiktok: string;
  whatsapp: string;
  androidLink: string;
  iosLink: string;
  notes: string;
};
