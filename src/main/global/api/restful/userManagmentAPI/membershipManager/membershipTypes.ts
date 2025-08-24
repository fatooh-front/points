export type Attachment = {
  name: string;
  url: string;
};
export type Membership = {
  memberId?: number;
  memberName: string;
  arabicName: string;
  details: string;
  arabicDetails: string;
  icon: string;
  startPoints: number;
  endPoints: number;
  discountPercentage: number;
  maxDiscount: number;
  maxLateHours: number;
  anotherBranch: 0 | 1; // boolean-like flag
  preOrderAllowed: 0 | 1; // boolean-like flag
  hoursPreOrder: number;
  freeKm: number;
  luxuryCars: 0 | 1; // boolean-like flag
  typeId: number;
  luxuryCarsDiscount: number;
  luxuryCarsMaxDiscount: number;
  maxRentLuxuryCars: number;
  notes?: string;
};
