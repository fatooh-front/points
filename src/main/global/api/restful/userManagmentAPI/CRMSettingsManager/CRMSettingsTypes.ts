export type Attachment = {
  name: string;
  url: string;
};
export type Group = {
  groupId?: number | string | null;
  groupName: string;
  arabicName: string;
  notes?: string | null;
};
export type Department = {
  depId?: number | string | null;
  depName: string;
  arabicName: string;
  notes?: string | null;
};

export type Source = {
  sourceId?: number | string | null;
  sourceName: string;
  arabicName: string;
  notes?: string | null;
};
export type Status = {
  statusId?: number | string | null;
  statusName: string;
  arabicName: string;
  notes?: string | null;
};
// types/ticket-type.ts
export type TicketType = {
  typeId: number;
  typeName: string;
  arabicName: string;
  notes?: string | null;
};
export type Ticket = {
  typeName: string | null;
  title: string | null;
  clientType: "LEAD" | "CUSTOMER" | string; // لو فيه أنواع تانية ضيفها
  depName: string | null;
  ticketDate: string | null; // أو Date لو الـ API بيرجعه كـ Date object
  ticketStatus: number;
  ticketId: number;
  clientName: string;
  phoneNumber: string | null;
};
// النوع الجديد للتكت ريزونز
export type TicketReason = {
  reasonId?: number | string | null;
  englishName: string;
  arabicName: string;
  notes?: string | null;
};
export interface EmployeeStats {
  empId: number;
  mapPoints: number;
  empName: string;
  createdContracts: number;
  closedContracts: number;
  openPoints: number;
  closedPoints: number;
  totalPoints: number;
  branchName?: string;
}
