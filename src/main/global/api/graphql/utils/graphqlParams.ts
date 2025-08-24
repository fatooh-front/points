export function convertToGraphqlParams(obj: any) {
  if (!obj) return null;
  const entries = Object.entries(obj)
    .map(([key, value]) => `${key}: ${typeof value === "string" ? `"${value}"` : value}`)
    .join(", ");
  return `{ ${entries} }`;
}
