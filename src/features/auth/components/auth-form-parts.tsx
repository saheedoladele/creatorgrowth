"use client";

import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function PlaceholderLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#preview"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className="text-primary underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

export function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-1">
      <h1 className="text-page-title text-foreground">{title}</h1>
      <p className="text-body text-muted-foreground">{description}</p>
    </header>
  );
}

export function PreviewNotice({ children }: { children: ReactNode }) {
  return <p className="text-caption text-muted-foreground">{children}</p>;
}

type TextFieldProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
};

export function TextField({
  id,
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  placeholder,
  description,
  disabled,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [description ? descriptionId : null, error ? errorId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...registration}
      />
      {description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </Field>
  );
}
