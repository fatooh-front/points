import { z } from "zod";

export const uniqueValidator = (
  value: any, 
  items: any[], 
  ctx: z.RefinementCtx,
  path: string,
  message: string
): boolean => {
  const isDuplicate = items?.some((item) => item.name === value);
  if (isDuplicate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: message,
      path: [path],
    });
  }
  return !isDuplicate;
};
