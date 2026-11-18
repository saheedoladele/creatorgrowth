import { z } from "zod";

const requiredEmail = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .email("Enter a valid email address.");

export const passwordSchema = z.string().min(8, "Use at least 8 characters.");

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value.length === 0 || z.url().safeParse(value).success,
    "Enter a valid URL, including https://.",
  );

const requiredUrl = z
  .string()
  .trim()
  .min(1, "Website is required.")
  .refine(
    (value) => z.url().safeParse(value).success,
    "Enter a valid URL, including https://.",
  );

export const loginSchema = z.object({
  email: requiredEmail("Email"),
  password: passwordSchema,
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Full name is required."),
    email: requiredEmail("Work email"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
    accountType: z.enum(
      ["creator", "business", "agency"],
      "Select an account type.",
    ),
    acceptedTerms: z
      .boolean()
      .refine((value) => value, "Accept the Terms of Service to continue."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: requiredEmail("Email"),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const accountTypeSchema = z.enum(
  ["creator", "business", "agency"],
  "Select an account type.",
);

const clientRanges = ["1-5", "6-20", "21-50", "50+"] as const;

const clientRangeSchema = z.enum(
  clientRanges,
  "Select how many clients you manage.",
);

export function workspaceStepSchema(
  accountType: "creator" | "business" | "agency",
) {
  if (accountType === "creator") {
    return z.object({
      workspaceName: z
        .string()
        .trim()
        .min(1, "Enter a creator or workspace name."),
      detail: z.string().trim().min(1, "Enter your primary niche."),
      website: optionalUrl,
    });
  }

  if (accountType === "business") {
    return z.object({
      workspaceName: z.string().trim().min(1, "Enter the business name."),
      detail: z.string().trim().min(1, "Enter the industry."),
      website: requiredUrl,
    });
  }

  return z.object({
    workspaceName: z.string().trim().min(1, "Enter the agency name."),
    detail: clientRangeSchema,
    website: requiredUrl,
  });
}

export const platformsSchema = z.object({
  platforms: z
    .array(z.enum(["facebook", "instagram", "tiktok"]))
    .min(1, "Select at least one platform."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
