type ReservationDetailsProps = {
  data: {
    total?: number | null;
    discount?: number | null;
    memberDiscount?: number | null;
    addedServicesTotalPrice?: number | null;
    pointsDiscount?: number | null;
    vat?: number | null;
    finalAmount?: number | null;
    paymentAmount?: number | null;
    paymentType?: string | null;
  };
};

export function ReservationDetails({ data }: ReservationDetailsProps) {
  const {
    total = 0,
    discount = 0,
    memberDiscount = 0,
    pointsDiscount = 0,
    addedServicesTotalPrice,
    vat = 0,
    finalAmount = 0,
    paymentAmount = 0,
  } = data || {};
  const totalDiscounts =
    Number(discount || 0) +
    Number(pointsDiscount || 0) +
    Number(memberDiscount || 0);
  const displayItems = [
    {
      label: "المجموع الفرعي (شامل القيمة المضافة)",
      value: total,
      suffix: "ر.س",
    },
    {
      label: "رسوم خدمة",
      value: addedServicesTotalPrice,
      suffix: "ر.س",
    },
    { label: "خصم خاص بالعضوية", value: memberDiscount, suffix: "ر.س" },
    { label: "خصم النقاط", value: pointsDiscount, suffix: "ر.س" },
    { label: "خصم كود ترويجي", value: discount, suffix: "ر.س" },

    { label: "ضريبة القيمة المضافة", value: vat, suffix: "ر.س" },
    { label: "المبلغ المطلوب سداده", value: finalAmount, suffix: "ر.س" },
    { label: "المبلغ المدفوع", value: paymentAmount, suffix: "ر.س" },
    {
      label: "إجمالي مبلغ التوفير",
      value: totalDiscounts,
      suffix: "ر.س",
    },
  ];

  return (
    <div className="p-4 mt-4 w-full">
      <p className="text-lg font-semibold mb-2">تفاصيل الحجز</p>
      <ul className="text-sm space-y-2">
        {displayItems.map((item, index) =>
          item.value ? (
            <li
              key={index}
              className={`py-4 flex w-full justify-between ${
                index < displayItems.length - 1 ? "border-b" : ""
              }`}
            >
              <div>{item.label}</div>
              <div>
                {item.value ?? 0} {item.suffix}
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
