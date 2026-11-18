"use client";

import { LoaderCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/components/auth-provider";
import {
  AuthHeader,
  PreviewNotice,
} from "@/features/auth/components/auth-form-parts";
import { maskEmail } from "@/features/auth/types";

export function VerifyEmailPanel() {
  const router = useRouter();
  const { user, verifyEmail, resendVerification } = useAuth();
  const [resendNote, setResendNote] = useState<string | null>(null);
  const [pending, setPending] = useState<"resend" | "continue" | null>(null);
  const email = user?.email ?? "preview@creatorgrowth.dev";
  const masked = maskEmail(email);

  async function resend() {
    setPending("resend");
    await resendVerification();
    setResendNote(
      `No message was sent. A later release would resend a verification message to ${masked}.`,
    );
    setPending(null);
  }

  async function continueSetup() {
    setPending("continue");
    await verifyEmail();
    router.push("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
        <Mail className="size-5" aria-hidden="true" />
      </div>
      <AuthHeader
        title="Confirm your email"
        description="Email delivery is not connected. This screen shows where a verification message would appear."
      />
      <p className="text-body text-foreground">
        Preview address: <span className="font-medium">{masked}</span>
      </p>
      {resendNote ? (
        <Alert>
          <AlertDescription>{resendNote}</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          size="lg"
          disabled={pending !== null}
          onClick={continueSetup}
        >
          {pending === "continue" ? (
            <LoaderCircle className="animate-spin" />
          ) : null}
          Continue
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending !== null}
          onClick={resend}
        >
          {pending === "resend" ? (
            <LoaderCircle className="animate-spin" />
          ) : null}
          Resend verification
        </Button>
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost", className: "w-full" }),
          )}
        >
          Change email
        </Link>
      </div>
      <PreviewNotice>
        Development preview only. Continuing does not prove that an email was
        sent or verified.
      </PreviewNotice>
    </div>
  );
}
