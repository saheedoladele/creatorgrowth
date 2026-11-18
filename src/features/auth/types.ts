export type AccountType = "creator" | "business" | "agency";

export type Platform = "facebook" | "instagram" | "tiktok";

/**
 * Preview user held only in memory. This is not an authenticated identity.
 */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  accountType: AccountType | null;
  emailVerified: boolean;
  onboardingComplete: boolean;
};

export type AuthSuccess<T> = {
  ok: true;
  data: T;
};

export type AuthFailure = {
  ok: false;
  message: string;
};

export type AuthResult<T> = AuthSuccess<T> | AuthFailure;

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  accountType: AccountType;
};

export type OnboardingDraft = {
  step: number;
  accountType: AccountType | null;
  workspaceName: string;
  detail: string;
  website: string;
  platforms: Platform[];
};

export const accountTypeOptions = [
  {
    value: "creator",
    title: "Creator",
    description: "Manage your own content, collaborations, and promotions.",
  },
  {
    value: "business",
    title: "Business",
    description: "Run paid promotions and work with creators.",
  },
  {
    value: "agency",
    title: "Agency",
    description: "Coordinate campaigns for the clients you manage.",
  },
] as const satisfies ReadonlyArray<{
  value: AccountType;
  title: string;
  description: string;
}>;

export const platformOptions = [
  {
    value: "facebook",
    title: "Facebook",
    description: "Pages and paid promotions",
  },
  {
    value: "instagram",
    title: "Instagram",
    description: "Reels, posts, and collaborations",
  },
  {
    value: "tiktok",
    title: "TikTok",
    description: "Short-form campaigns",
  },
] as const satisfies ReadonlyArray<{
  value: Platform;
  title: string;
  description: string;
}>;

export const clientRangeOptions = [
  { value: "1-5", label: "1–5 clients" },
  { value: "6-20", label: "6–20 clients" },
  { value: "21-50", label: "21–50 clients" },
  { value: "50+", label: "More than 50 clients" },
] as const;

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || "U";
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");

  if (!local || !domain) {
    return "•••••@example.com";
  }

  return `${local.slice(0, 1)}•••••@${domain}`;
}
