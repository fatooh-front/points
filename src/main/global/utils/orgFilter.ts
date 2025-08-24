const orgFilter = (
  orgKEY: string,
  onFilterValue: { organization: { _id: string } }[]
) => {
  const org = onFilterValue.filter((org) =>
    orgKEY.includes(org.organization._id)
  );
  console.log("org", org, orgKEY, "sssssssssss");

  return org ? org : [];
};
const multiOrgFilter = (
  orgKEY: any,
  onFilterValue: { organization: { _id: string } }[]
) => {
  const org = onFilterValue.filter((org) =>
    orgKEY.includes(org.organization._id)
  );
  console.log("org", org, orgKEY, "sssssssssss");

  return org ? org : [];
};

export default orgFilter;
export { multiOrgFilter };
