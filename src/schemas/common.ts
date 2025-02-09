import { z } from "zod";

export const locationSchema = z
  .object({
    address: z.string(),
    formatted_address: z.string(),
    place_id: z.string(),
    lat: z.number(),
    lng: z.number(),
  })
  .required();

export const dateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export type Location = z.infer<typeof locationSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;