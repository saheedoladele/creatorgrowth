"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/components/auth-provider";
import {
  AuthHeader,
  PreviewNotice,
  TextField,
} from "@/features/auth/components/auth-form-parts";
import { PasswordField } from "@/features/auth/components/password-field";
import { loginSchema, type LoginValues } from "@/features/auth/schemas/auth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function onSubmit(values: LoginValues) {
    setFormError(null);
    const result = await login(values);

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    router.push(result.data.onboardingComplete ? "/dashboard" : "/onboarding");
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Welcome back"
        description="Sign in to your Creator Growth workspace."
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
          id="email"
          label="Email address"
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
          autoComplete="current-password"
          registration={register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <div className="flex items-center justify-between gap-3">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal" className="w-auto">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  disabled={isSubmitting}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <FieldLabel htmlFor="remember-me" className="font-normal">
                  Remember me
                </FieldLabel>
              </Field>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-primary text-sm underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
          {isSubmitting ? "Signing in" : "Sign in"}
        </Button>
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">or</span>
          <Separator className="flex-1" />
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          onClick={() =>
            setFormError(
              "Google sign-in is a visual placeholder. It does not authenticate this preview.",
            )
          }
        >
          <span
            aria-hidden="true"
            className="bg-muted text-foreground flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
          >
            G
          </span>
          Continue with Google
        </Button>
      </form>
      <p className="text-muted-foreground text-sm">
        New to Creator Growth?{" "}
        <Link
          href="/register"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
      <PreviewNotice>
        Development preview only. This sign-in is stored in memory for the
        current tab and is not secure authentication. Existing preview account:
        saheed@creatorgrowth.dev / password123.
      </PreviewNotice>
    </div>
  );
}
