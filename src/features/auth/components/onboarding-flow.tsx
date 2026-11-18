"use client";

import { Briefcase, Check, LoaderCircle, UserRound, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/features/auth/components/auth-provider";
import { PreviewNotice } from "@/features/auth/components/auth-form-parts";
import { SelectionCard } from "@/features/auth/components/selection-card";
import {
  accountTypeSchema,
  platformsSchema,
  workspaceStepSchema,
} from "@/features/auth/schemas/auth";
import {
  accountTypeLabel,
  authService,
} from "@/features/auth/services/auth-service";
import {
  accountTypeOptions,
  clientRangeOptions,
  platformOptions,
  type AccountType,
  type OnboardingDraft,
  type Platform,
} from "@/features/auth/types";

const totalSteps = 5;

const accountIcons = {
  creator: UserRound,
  business: Briefcase,
  agency: Users,
} as const;

function issueMessage(
  result:
    | { success: true }
    | { success: false; error: { issues: { message: string }[] } },
) {
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Check this step and try again.";
}

function validateStep(draft: OnboardingDraft) {
  if (draft.step === 1) {
    return issueMessage(accountTypeSchema.safeParse(draft.accountType));
  }

  if (draft.step === 2) {
    const accountType = accountTypeSchema.safeParse(draft.accountType);
    if (!accountType.success) {
      return "Select an account type before adding workspace details.";
    }

    return issueMessage(
      workspaceStepSchema(accountType.data).safeParse({
        workspaceName: draft.workspaceName,
        detail: draft.detail,
        website: draft.website,
      }),
    );
  }

  if (draft.step === 3) {
    return issueMessage(
      platformsSchema.safeParse({ platforms: draft.platforms }),
    );
  }

  return null;
}

function getServerDraft() {
  return authService.getServerOnboardingDraft();
}

export function OnboardingFlow() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const storedDraft = useSyncExternalStore(
    authService.subscribeOnboardingDraft,
    authService.getOnboardingDraft,
    getServerDraft,
  );
  const draft = useMemo<OnboardingDraft>(() => {
    if (!storedDraft.accountType && user?.accountType) {
      return { ...storedDraft, accountType: user.accountType };
    }
    return storedDraft;
  }, [storedDraft, user]);
  const [stepError, setStepError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  function commit(next: OnboardingDraft) {
    authService.saveOnboardingDraft(next);
  }

  function update(patch: Partial<OnboardingDraft>) {
    setStepError(null);
    commit({ ...draft, ...patch });
  }

  function selectAccountType(accountType: AccountType) {
    setStepError(null);
    commit({
      ...draft,
      accountType,
      detail: draft.accountType === accountType ? draft.detail : "",
    });
  }

  function togglePlatform(platform: Platform, checked: boolean) {
    setStepError(null);
    const platforms = checked
      ? Array.from(new Set([...draft.platforms, platform]))
      : draft.platforms.filter((item) => item !== platform);
    commit({ ...draft, platforms });
  }

  function goBack() {
    setStepError(null);
    commit({ ...draft, step: Math.max(0, draft.step - 1) });
  }

  function goNext() {
    const message = validateStep(draft);
    if (message) {
      setStepError(message);
      return;
    }
    setStepError(null);
    commit({ ...draft, step: Math.min(totalSteps - 1, draft.step + 1) });
  }

  function finish() {
    setFinishing(true);
    completeOnboarding(draft);
    router.push("/dashboard");
  }

  const step = draft.step;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progress} aria-label="Onboarding progress">
        <div className="flex w-full items-baseline justify-between gap-3">
          <ProgressLabel>
            Step {step + 1} of {totalSteps}
          </ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>

      {step === 0 ? <WelcomeStep /> : null}
      {step === 1 ? (
        <AccountStep
          value={draft.accountType}
          onChange={selectAccountType}
          error={stepError}
        />
      ) : null}
      {step === 2 && draft.accountType ? (
        <WorkspaceStep
          accountType={draft.accountType}
          draft={draft}
          error={stepError}
          onChange={update}
        />
      ) : null}
      {step === 3 ? (
        <PlatformStep
          selected={draft.platforms}
          error={stepError}
          onToggle={togglePlatform}
        />
      ) : null}
      {step === 4 ? <FinishStep draft={draft} /> : null}

      {stepError && step !== 1 && step !== 2 && step !== 3 ? (
        <FieldError>{stepError}</FieldError>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={step === 0 || finishing}
        >
          Back
        </Button>
        {step < totalSteps - 1 ? (
          <Button type="button" onClick={goNext} disabled={finishing}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={finish} disabled={finishing}>
            {finishing ? <LoaderCircle className="animate-spin" /> : null}
            Enter dashboard
          </Button>
        )}
      </div>
      <PreviewNotice>
        Development preview. These answers stay in this browser tab until you
        refresh.
      </PreviewNotice>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="space-y-3">
      <h1 className="text-page-title text-foreground">
        Welcome to Creator Growth
      </h1>
      <p className="text-body text-muted-foreground">
        Set up a workspace for campaigns, creator collaborations, and
        performance across Facebook, Instagram, and TikTok.
      </p>
      <ul className="text-body text-muted-foreground list-disc space-y-1 pl-5">
        <li>Choose whether you work as a creator, business, or agency.</li>
        <li>Name the workspace and add a few details.</li>
        <li>Select the platforms you plan to use. Nothing is connected yet.</li>
      </ul>
    </div>
  );
}

function AccountStep({
  value,
  onChange,
  error,
}: {
  value: AccountType | null;
  onChange: (value: AccountType) => void;
  error: string | null;
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <div className="space-y-1">
        <h1 className="text-page-title text-foreground">
          Choose an account type
        </h1>
        <p className="text-body text-muted-foreground">
          This decides which workspace details we ask for next.
        </p>
      </div>
      <RadioGroup
        value={value ?? ""}
        onValueChange={(next) => onChange(next as AccountType)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "account-type-error" : undefined}
        className="gap-2"
      >
        {accountTypeOptions.map((option) => {
          const Icon = accountIcons[option.value];
          return (
            <SelectionCard
              key={option.value}
              title={option.title}
              description={option.description}
              selected={value === option.value}
              icon={<Icon className="size-4" aria-hidden="true" />}
            >
              <RadioGroupItem
                value={option.value}
                aria-label={option.title}
                className="mt-1"
              />
            </SelectionCard>
          );
        })}
      </RadioGroup>
      {error ? <FieldError id="account-type-error">{error}</FieldError> : null}
    </Field>
  );
}

function WorkspaceStep({
  accountType,
  draft,
  error,
  onChange,
}: {
  accountType: AccountType;
  draft: OnboardingDraft;
  error: string | null;
  onChange: (patch: Partial<OnboardingDraft>) => void;
}) {
  const copy = {
    creator: {
      title: "Creator workspace",
      name: "Creator or workspace name",
      detail: "Primary content niche",
      detailPlaceholder: "Beauty, finance, gaming",
      websiteRequired: false,
    },
    business: {
      title: "Business workspace",
      name: "Business name",
      detail: "Industry",
      detailPlaceholder: "Retail, hospitality, software",
      websiteRequired: true,
    },
    agency: {
      title: "Agency workspace",
      name: "Agency name",
      detail: "Clients managed",
      detailPlaceholder: "",
      websiteRequired: true,
    },
  }[accountType];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-page-title text-foreground">{copy.title}</h1>
        <p className="text-body text-muted-foreground">
          Add the minimum details for this workspace.
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="workspace-name">{copy.name}</FieldLabel>
        <Input
          id="workspace-name"
          value={draft.workspaceName}
          autoComplete="organization"
          onChange={(event) => onChange({ workspaceName: event.target.value })}
        />
      </Field>
      {accountType === "agency" ? (
        <Field>
          <FieldLabel>Number of clients</FieldLabel>
          <RadioGroup
            value={draft.detail}
            onValueChange={(value) => onChange({ detail: value })}
            className="gap-2"
          >
            {clientRangeOptions.map((option) => (
              <label
                key={option.value}
                className="border-border hover:bg-muted/50 focus-within:border-ring focus-within:ring-ring/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 focus-within:ring-3"
              >
                <RadioGroupItem value={option.value} />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </Field>
      ) : (
        <Field>
          <FieldLabel htmlFor="workspace-detail">{copy.detail}</FieldLabel>
          <Input
            id="workspace-detail"
            value={draft.detail}
            placeholder={copy.detailPlaceholder}
            onChange={(event) => onChange({ detail: event.target.value })}
          />
        </Field>
      )}
      <Field>
        <FieldLabel htmlFor="workspace-website">Website</FieldLabel>
        <Input
          id="workspace-website"
          type="url"
          inputMode="url"
          placeholder="https://"
          autoComplete="url"
          value={draft.website}
          onChange={(event) => onChange({ website: event.target.value })}
        />
        {accountType === "creator" ? (
          <FieldDescription>Optional</FieldDescription>
        ) : null}
      </Field>
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

function PlatformStep({
  selected,
  error,
  onToggle,
}: {
  selected: Platform[];
  error: string | null;
  onToggle: (platform: Platform, checked: boolean) => void;
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <div className="space-y-1">
        <h1 className="text-page-title text-foreground">Platforms you use</h1>
        <p className="text-body text-muted-foreground">
          Choose preferences only. Accounts are not connected.
        </p>
      </div>
      <div className="grid gap-2">
        {platformOptions.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <SelectionCard
              key={option.value}
              title={option.title}
              description={option.description}
              selected={checked}
              icon={
                <span className="text-xs font-semibold">
                  {option.title.slice(0, 1)}
                </span>
              }
            >
              <Checkbox
                checked={checked}
                aria-label={option.title}
                className="mt-1"
                onCheckedChange={(next) => onToggle(option.value, next)}
              />
            </SelectionCard>
          );
        })}
      </div>
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

function FinishStep({ draft }: { draft: OnboardingDraft }) {
  const platforms = platformOptions
    .filter((option) => draft.platforms.includes(option.value))
    .map((option) => option.title)
    .join(", ");

  return (
    <div className="space-y-4">
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
        <Check className="size-5" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h1 className="text-page-title text-foreground">
          Your workspace is ready
        </h1>
        <p className="text-body text-muted-foreground">
          You can enter the dashboard. Campaigns and account connections come
          later.
        </p>
      </div>
      <dl className="bg-muted/40 divide-border divide-y rounded-lg border text-sm">
        <SummaryItem
          label="Account type"
          value={accountTypeLabel(draft.accountType)}
        />
        <SummaryItem
          label="Workspace"
          value={draft.workspaceName || "Untitled"}
        />
        <SummaryItem label="Platforms" value={platforms || "None selected"} />
      </dl>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
