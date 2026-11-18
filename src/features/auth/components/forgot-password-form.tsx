"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/components/auth-provider";
import {
  AuthHeader,
  PreviewNotice,
  TextField,
} from "@/features/auth/components/auth-form-parts";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/features/auth/schemas/auth";

export function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const result = await forgotPassword(values.email);
    if (result.ok) {
      setSubmittedEmail(result.data.email);
    }
  }

  if (submittedEmail) {
    return (
      <div className="space-y-6">
        <AuthHeader
          title="Check your inbox later"
          description="Password reset is not connected yet."
        />
        <Alert>
          <AlertTitle>Request received</AlertTitle>
          <AlertDescription>
            If an account exists for {submittedEmail}, a password-reset link
            would be sent. No email was sent in this development preview.
          </AlertDescription>
        </Alert>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline", className: "w-full" }),
          )}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email and we will prepare a reset request."
      />
      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          registration={register("email")}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
          {isSubmitting ? "Submitting" : "Send reset request"}
        </Button>
      </form>
      <Link
        href="/login"
        className="text-primary inline-block text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to sign in
      </Link>
      <PreviewNotice>
        Development preview only. This form does not send email.
      </PreviewNotice>
    </div>
  );
}
