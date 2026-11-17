import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { ShowcaseSection } from "../showcase-section";

export function FormsSection() {
  return (
    <ShowcaseSection
      id="forms"
      title="Forms"
      description="Labels stay attached to controls. Invalid fields use the destructive token and an alert message."
    >
      <FieldGroup className="max-w-xl">
        <Field>
          <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
          <Input
            id="workspace-name"
            name="workspace-name"
            defaultValue="Northwind Studio"
            autoComplete="organization"
          />
          <FieldDescription>
            Shown on invoices and shared reports.
          </FieldDescription>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor="contact-email">Contact email</FieldLabel>
          <Input
            id="contact-email"
            name="contact-email"
            type="email"
            defaultValue="team@"
            aria-invalid="true"
            autoComplete="email"
          />
          <FieldError>Enter a complete email address.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="notes">Notes</FieldLabel>
          <Textarea
            id="notes"
            name="notes"
            defaultValue="Share the weekly summary with the operations group."
            rows={3}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="region">Region</FieldLabel>
          <Select defaultValue="us">
            <SelectTrigger id="region" className="w-full">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="apac">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Report cadence</FieldLabel>
          <RadioGroup defaultValue="weekly" aria-label="Report cadence">
            <Field orientation="horizontal">
              <RadioGroupItem value="daily" id="cadence-daily" />
              <FieldLabel htmlFor="cadence-daily">Daily</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="weekly" id="cadence-weekly" />
              <FieldLabel htmlFor="cadence-weekly">Weekly</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="monthly" id="cadence-monthly" />
              <FieldLabel htmlFor="cadence-monthly">Monthly</FieldLabel>
            </Field>
          </RadioGroup>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="product-updates" defaultChecked />
          <FieldLabel htmlFor="product-updates">
            Send product updates
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="email-alerts" defaultChecked />
          <div className="space-y-0.5">
            <FieldLabel htmlFor="email-alerts">Email alerts</FieldLabel>
            <FieldDescription>Only when a number changes.</FieldDescription>
          </div>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor="locked-field">Locked field</FieldLabel>
          <Input id="locked-field" defaultValue="Read only" disabled />
        </Field>
      </FieldGroup>
    </ShowcaseSection>
  );
}
