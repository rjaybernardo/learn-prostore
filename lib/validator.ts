import { z } from "zod";

import { formatNumberWithDecimal } from "@/lib/utils";

const currency = z
  .string()
  .trim()
  .refine((value) => {
    const number = Number(value);

    if (!Number.isFinite(number) || number < 0) {
      return false;
    }

    return /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(number));
  }, "Price must have a valid amount with up to two decimal places")
  .transform((value) => Number(value));

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  slug: z.string().min(3, "Slug must be at least 3 characters"),

  category: z.string().min(3, "Category must be at least 3 characters"),

  brand: z.string().min(3, "Brand must be at least 3 characters"),

  description: z.string().min(3, "Description must be at least 3 characters"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),

  images: z.array(z.string()).min(1, "Product must have at least one image"),

  price: currency,

  isFeatured: z.boolean(),

  banner: z.string().nullable(),
});
