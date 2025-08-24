export type Attachment = {
  name: string;
  url: string;
};
export type Promo = {
  promoId?: number | string | null;
  promo: string;
  startDate: string; // ISO date string e.g. "2025-07-01T00:00:00"
  endDate: string; // ISO date string
  promoType: number; // e.g. 1 for percentage, 2 for fixed amount, etc.
  promoValue: number; // The discount value
  promoStatus: number; // e.g. 1 = active, 0 = inactive
  clientId: number | string; // 0 for all clients, or specific client ID
  maxUse: number; // Max total uses
  maxUsePerClient: number; // Max uses per individual client
  minValue: number; // Minimum order value for promo to apply
  maxValue: number; // Maximum discount value applicable
  notes?: string | null; // Description or internal notes
};
