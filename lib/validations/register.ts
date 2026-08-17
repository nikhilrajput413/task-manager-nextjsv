import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  applicantCategory: z.string().optional(),
  organizationName: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;