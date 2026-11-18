"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, LoaderCircle, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/features/auth/components/auth-provider";
import {
  AuthHeader,
  PlaceholderLink,
  PreviewNotice,
  TextField,
} from "@/features/auth/components/auth-form-parts";
import { PasswordField } from "@/features/auth/components/password-field";
import { SelectionCard } from "@/features/auth/components/selection-card";
import {
  registerSchema,
  type RegisterValues,
} from "@/features/auth/schemas/auth";
import { accountTypeOptions, type AccountType } from "@/features/auth/types";

const accountIcons = {
  creator: UserRound,
  business: Briefcase,
  agency: Users,
} as const;

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAccount } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  async function onSubmit(values: RegisterValues) {
    setFormError(null);
    const result = await registerAccount({
      name: values.name,
      email: values.email,
      password: values.password,
      accountType: values.accountType,
    });

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    router.push("/verify-email");
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Create your account"
        description="Start a workspace for a creator, business, or agency."
      />
      <form
        noValidate
        className="flex flex-col gap-5"
        onChange={() => setFormError(null)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}
        <TextField
          id="name"
          label="Full name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
          disabled={isSubmitting}
        />
        <TextField
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          registration={register("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
        />
        <Controller
          name="accountType"
          control={control}
          render={({ field }) => (
            <Field data-invalid={errors.accountType ? true : undefined}>
              <FieldLabel>Account type</FieldLabel>
              <RadioGroup
                value={field.value ?? ""}
                onValueChange={(value) => field.onChange(value as AccountType)}
                aria-invalid={errors.accountType ? true : undefined}
                className="gap-2"
              >
                {accountTypeOptions.map((option) => {
                  const Icon = accountIcons[option.value];
                  return (
                    <SelectionCard
                      key={option.value}
                      title={option.title}
                      description={option.description}
                      selected={field.value === option.value}
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
              {errors.accountType?.message ? (
                <FieldError>{errors.accountType.message}</FieldError>
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="acceptedTerms"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              className="items-start"
              data-invalid={fieldState.error ? true : undefined}
            >
              <Checkbox
                id="terms"
                checked={field.value}
                disabled={isSubmitting}
                aria-invalid={fieldState.error ? true : undefined}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <div className="space-y-1">
                <FieldLabel htmlFor="terms" className="font-normal">
                  I agree to the{" "}
                  <PlaceholderLink>Terms of Service</PlaceholderLink> and{" "}
                  <PlaceholderLink>Privacy Policy</PlaceholderLink>.
                </FieldLabel>
                {fieldState.error?.message ? (
                  <FieldError>{fieldState.error.message}</FieldError>
                ) : null}
              </div>
            </Field>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
          {isSubmitting ? "Creating account" : "Create account"}
        </Button>
      </form>
      <p className="text-muted-foreground text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
      <PreviewNotice>
        Development preview only. Registration does not create a real account or
        send email.
      </PreviewNotice>
    </div>
  );
}
