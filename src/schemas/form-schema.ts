import { z } from "zod";

/**
 * The schema for the form using Zod.
 * @typedef {object} FormSchema
 * @property {string} name - The name field, required and must be at least 3 characters.
 * @property {string} birthdate - The birthdate field, required.
 * @property {boolean} acceptTerms - The terms acceptance checkbox, required and must be true.
 * @property {string} favoriteColor - The favorite color dropdown, required.
 */
export const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  birthdate: z
    .string()
    .min(1, "Birthdate is required")
    .refine((dateStr) => {
      // Check if it's a valid date
      const birthDate = new Date(dateStr);
      if (isNaN(birthDate.getTime())) {
        return false;
      }

      // Convert to UTC
      const today = new Date();
      const birth = new Date(
        Date.UTC(
          birthDate.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate()
        )
      );
      const now = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
      );

      // Calculate age
      const diffTime = Math.abs(now.getTime() - birth.getTime());
      const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));

      return age >= 18;
    }, "You must be at least 18 years old to register"),
  acceptTerms: z
    .boolean()
    .refine((value) => value === true, "You must accept the terms."),
  favoriteColor: z.string().min(1, "Please select a favorite color."),
});

/**
 * Type for form values based on the schema.
 * @typedef {z.infer<typeof formSchema>} FormValues
 */
export type FormValues = z.infer<typeof formSchema>;
