export type Attachment = {
  name: string;
  url: string;
};
export type Reservation = {
  pointsDiscount: number;
  totalDiscount: number;
  memberShipDiscount: number;
  promoDiscount: number;

  pickupAddress: string | null;
  deliveryAddress: string | null;
  reservationId: number;
  reservationStatus: number;
  paymentMethod: string | null;
  startDate: string | Date; // ISO date string
  endDate: string | Date; // ISO date string
  clientName: string;
  clientMobile: string;
  carName: string;
  reservationType: number;
  days: number;
  fromBranchId: number;
  fromBranchName: string;
  addedDate: string;
  fromBranchArName: string;
  toBranchId: number;
  toBranchName: string;
  toBranchArName: string;
  mobile: string;
  pickupLongitude: number | null;
  pickupLatitude: number | null;
  deliveryLongitude: number | null;
  deliveryLatitude: number | null;
  pickupCost?: number | null;
  total?: number | null;
  insuranceValue?: number | null;
  extraKmPackage?: number | null;
  anotherBranchCost?: number | null;
  deliveryCost?: number | null;
  extraHoursCost?: number | null;
  subtotal?: number | null;
  serviceIds?: string | null;
};

export type LimousineReservation = {
  resId: number;
  carName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  resType: "OTHER_PLACES" | "BRANCH" | string; // حسب القيم المتوقعة
  paymentType: string | null;
  resStatus: "NOT_STARTED" | "ACTIVE" | "CANCELED" | "FINISHED" | string; // حسب الحالات المسموحة
};
export type ReservationDetails = {
  id: number | string;
  clientFirstName: string;
  clientLastName: string;
  carName: string;
  reservationDate: string;
  mobile: string;
  addedServicesTotalPrice: number;
  reservationType: "AIRPORT" | "OTHER_PLACES" | "BRANCH" | string;
  subType: string | null;
  fromPlace: number | string;
  toPlace: number | string;
  flightNumber: string;
  cityId: number | string;
  latitude: number | string;
  longitude: number | string;
  toCityId: number | string | null;
  toLatitude: number | string | null;
  toLongitude: number | string | null;
  hours: number | string | null;
  days: number | string | null;
  total: number | string;
  promoId: number | string | null;
  discount: number | string;
  memberDiscount: number | string;
  pointsDiscount: number | string;
  vat: number | string;
  finalAmount: number | string;
  paymentType: string | null;
  paymentAmount: number | string | null;
  notes: string | null;
  reservationStatus:
    | "NOT_STARTED"
    | "ACTIVE"
    | "CANCELED"
    | "FINISHED"
    | string;
  addedDate: string;
  address: string | null;
  toAddress: string | null;
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
