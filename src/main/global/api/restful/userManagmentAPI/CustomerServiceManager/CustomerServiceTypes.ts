export type Lead = {
  leadId?: number;
  userId?: string | number;
  addedDate?: string;
  leadType?: string | number;
  statusName?: string | number;
  groupName?: string | number;
  sourceName?: string | number;

  companyName?: string | null;
  city?: string | null;
  address?: string | null;
  phone?: string | null;
  mobile1?: string | null;
  mobile2?: string | null;

  email?: string | null;
  website?: string | null;

  regNumber?: string | null;
  vatNumber?: string | null;

  statusId?: number | null;
  groupId?: number | null;
  sourceId?: number | null;

  notes?: string | null;
};
