export function evaluateQuery(baseFields: any, fieldChildren: any, depth: number) {
  console.log("depth", depth);
  if (depth === 0 || isNaN(depth)) {
    return baseFields;
  }

  const childFields: any = `
      ${baseFields}
      ${fieldChildren} {
        ${evaluateQuery(baseFields, fieldChildren, depth - 1)}  
      }
    `;

  return childFields;
}
