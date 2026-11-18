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
} from "@/features/auth/components/auth-form-parts";
import { PasswordField } from "@/features/auth/components/password-field";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/features/auth/schemas/auth";

export function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [complete, setComplete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    const result = await resetPassword();
    if (result.ok) {
      setComplete(true);
    }
  }

  if (complete) {
    return (
      <div className="space-y-6">
        <AuthHeader
          title="Password reset preview complete"
          description="The stored password was not changed."
        />
        <Alert>
          <AlertTitle>Ready for the API</AlertTitle>
          <AlertDescription>
            A later release will check a reset link and update the password. You
            can return to sign in.
          </AlertDescription>
        </Alert>
        <Link
          href="/login"
          className={cn(buttonVariants({ className: "w-full" }))}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Choose a new password"
        description="This preview accepts a new password without checking a reset link."
      />
      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PasswordField
          id="password"
          label="New password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm new password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
          {isSubmitting ? "Saving" : "Update password"}
        </Button>
      </form>
      <Link
        href="/login"
        className="text-primary inline-block text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to sign in
      </Link>
      <PreviewNotice>
        Development preview only. No password is stored or emailed.
      </PreviewNotice>
    </div>
  );
}
