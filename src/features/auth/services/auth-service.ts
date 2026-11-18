import type {
  AccountType,
  AuthResult,
  AuthUser,
  LoginInput,
  OnboardingDraft,
  RegisterInput,
} from "@/features/auth/types";

/**
 * Development-only authentication stand-in.
 *
 * The session lives in module memory for the current browser tab. It is not
 * secure, it is not persisted, and it must be replaced by the NestJS API.
 * Nothing here issues tokens, sends email, or verifies a real identity.
 */

const PREVIEW_PASSWORD = "password123";

type AccountRecord = {
  password: string;
  user: AuthUser;
};

const accounts = new Map<string, AccountRecord>();

accounts.set("saheed@creatorgrowth.dev", {
  password: PREVIEW_PASSWORD,
  user: {
    id: "user_saheed",
    name: "Saheed Adeyemi",
    email: "saheed@creatorgrowth.dev",
    accountType: "creator",
    emailVerified: true,
    onboardingComplete: true,
  },
});

let session: AuthUser | null = null;
const listeners = new Set<() => void>();

const emptyDraft: OnboardingDraft = {
  step: 0,
  accountType: null,
  workspaceName: "",
  detail: "",
  website: "",
  platforms: [],
};

let onboardingDraft: OnboardingDraft = emptyDraft;
const draftListeners = new Set<() => void>();

function publishDraft(draft: OnboardingDraft) {
  onboardingDraft = draft;
  draftListeners.forEach((listener) => listener());
}

function wait(ms = 450) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function publish(next: AuthUser | null) {
  session = next;

  if (next) {
    const record = accounts.get(next.email);
    if (record) {
      record.user = next;
    }
  }

  listeners.forEach((listener) => listener());
}

function failure(message: string): AuthResult<never> {
  return { ok: false, message };
}

export const authService = {
  /** In-memory preview session. Returns null during server rendering. */
  getCurrentUser() {
    return session;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getOnboardingDraft() {
    return onboardingDraft;
  },

  getServerOnboardingDraft() {
    return emptyDraft;
  },

  subscribeOnboardingDraft(listener: () => void) {
    draftListeners.add(listener);
    return () => draftListeners.delete(listener);
  },

  saveOnboardingDraft(draft: OnboardingDraft) {
    publishDraft(draft);
  },

  async login(input: LoginInput): Promise<AuthResult<AuthUser>> {
    await wait();
    // rememberMe is part of the form contract. This preview does not persist it.
    const email = normalizeEmail(input.email);
    const record = accounts.get(email);

    if (!record) {
      return failure(
        "No preview account exists for that email. Register to continue.",
      );
    }

    if (record.password !== input.password) {
      return failure("That password does not match this preview account.");
    }

    publish(record.user);
    return { ok: true, data: record.user };
  },

  async register(input: RegisterInput): Promise<AuthResult<AuthUser>> {
    await wait();
    const email = normalizeEmail(input.email);

    if (accounts.has(email)) {
      return failure(
        "An account with this email already exists in this preview.",
      );
    }

    const user: AuthUser = {
      id: `user_${crypto.randomUUID()}`,
      name: input.name.trim(),
      email,
      accountType: input.accountType,
      emailVerified: false,
      onboardingComplete: false,
    };

    accounts.set(email, { password: input.password, user });
    publishDraft({
      ...emptyDraft,
      accountType: input.accountType,
      workspaceName: input.name.trim(),
    });
    publish(user);
    return { ok: true, data: user };
  },

  async forgotPassword(email: string): Promise<AuthResult<{ email: string }>> {
    await wait();
    return { ok: true, data: { email: normalizeEmail(email) } };
  },

  async resetPassword(): Promise<AuthResult<{ updated: false }>> {
    await wait();
    return { ok: true, data: { updated: false } };
  },

  async verifyEmail(): Promise<AuthResult<AuthUser | null>> {
    await wait(300);

    if (!session) {
      return { ok: true, data: null };
    }

    publish({ ...session, emailVerified: true });
    return { ok: true, data: session };
  },

  async resendVerification(): Promise<AuthResult<{ sent: false }>> {
    await wait(300);
    return { ok: true, data: { sent: false } };
  },

  completeOnboarding(draft: OnboardingDraft): AuthUser {
    const accountType = draft.accountType ?? session?.accountType ?? "creator";
    const next: AuthUser = {
      id: session?.id ?? `user_${crypto.randomUUID()}`,
      name: session?.name || draft.workspaceName.trim() || "Preview user",
      email: session?.email ?? "preview@creatorgrowth.dev",
      accountType,
      emailVerified: session?.emailVerified ?? false,
      onboardingComplete: true,
    };

    if (!accounts.has(next.email)) {
      accounts.set(next.email, { password: PREVIEW_PASSWORD, user: next });
    }

    publish(next);
    return next;
  },

  logout() {
    publish(null);
  },
};

export function isFirstTimeUser(user: AuthUser) {
  return !user.onboardingComplete;
}

export function accountTypeLabel(accountType: AccountType | null) {
  if (accountType === "business") return "Business";
  if (accountType === "agency") return "Agency";
  if (accountType === "creator") return "Creator";
  return "Not selected";
}
