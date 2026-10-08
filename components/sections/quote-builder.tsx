"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { submitLead } from "@/app/contact/actions";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BUDGET_RANGE_LABELS,
  BUDGET_RANGES,
  FEATURE_LABELS,
  FEATURES,
  LEAD_STEP_FIELDS,
  PROJECT_TYPE_LABELS,
  PROJECT_TYPES,
  TIMELINE_LABELS,
  TIMELINES,
  leadSchema,
  type LeadFormValues,
} from "@/lib/validations/lead";

const STEP_TITLES = ["What are we building?", "Timeline & budget", "Your details"];

function OptionCard({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
        active
          ? "border-brand bg-brand/10 text-foreground"
          : "border-border bg-surface/60 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: undefined,
      features: [],
      timeline: undefined,
      budgetRange: undefined,
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const features = watch("features") ?? [];
  const isLastStep = step === STEP_TITLES.length - 1;

  async function goNext() {
    const valid = await trigger(LEAD_STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(values: LeadFormValues) {
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitLead(values);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error);
      }
    });
  }

  if (submitted) {
    return (
      <Reveal className="glass glow-border fx-card flex flex-col items-center gap-3 rounded-3xl border border-border p-10 text-center">
        <CheckCircle2 className="size-10 text-success" />
        <h3 className="font-display text-xl font-semibold text-foreground">Got it — thank you</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          We&apos;ll review your project and get back to you within one business day. If it&apos;s
          urgent, message us on WhatsApp in the meantime.
        </p>
      </Reveal>
    );
  }

  return (
    <div className="glass glow-border fx-card rounded-3xl border border-border p-6 sm:p-8">
      <div className="mb-8 flex items-center gap-2">
        {STEP_TITLES.map((title, i) => (
          <div key={title} className="flex flex-1 flex-col gap-2">
            <div
              className={cn(
                "h-1 rounded-full transition-colors",
                i <= step ? "bg-brand" : "bg-border",
              )}
            />
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                i === step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 ? (
          <div className="flex flex-col gap-8">
            <div>
              <Label className="mb-3 block text-sm font-semibold text-foreground">
                Project type
              </Label>
              <Controller
                control={control}
                name="projectType"
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {PROJECT_TYPES.map((type) => (
                      <OptionCard
                        key={type}
                        active={field.value === type}
                        label={PROJECT_TYPE_LABELS[type]}
                        onClick={() => field.onChange(type)}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.projectType ? (
                <p className="mt-2 text-xs text-danger">{errors.projectType.message}</p>
              ) : null}
            </div>

            <div>
              <Label className="mb-3 block text-sm font-semibold text-foreground">
                Features you need{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Controller
                control={control}
                name="features"
                render={({ field }) => (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {FEATURES.map((feature) => {
                      const checked = features.includes(feature);
                      const toggle = () => {
                        field.onChange(
                          checked
                            ? field.value.filter((f) => f !== feature)
                            : [...field.value, feature],
                        );
                      };
                      return (
                        <label
                          key={feature}
                          onClick={(e) => {
                            e.preventDefault();
                            toggle();
                          }}
                          className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-surface/60 px-3.5 py-2.5 text-sm text-foreground/90"
                        >
                          <Checkbox checked={checked} onCheckedChange={toggle} />
                          {FEATURE_LABELS[feature]}
                        </label>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col gap-8">
            <div>
              <Label className="mb-3 block text-sm font-semibold text-foreground">Timeline</Label>
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    {TIMELINES.map((timeline) => (
                      <label
                        key={timeline}
                        onClick={() => field.onChange(timeline)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors",
                          field.value === timeline
                            ? "border-brand bg-brand/10 text-foreground"
                            : "border-border bg-surface/60 text-muted-foreground",
                        )}
                      >
                        <RadioGroupItem value={timeline} />
                        {TIMELINE_LABELS[timeline]}
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.timeline ? (
                <p className="mt-2 text-xs text-danger">{errors.timeline.message}</p>
              ) : null}
            </div>

            <div>
              <Label className="mb-3 block text-sm font-semibold text-foreground">
                Budget range
              </Label>
              <Controller
                control={control}
                name="budgetRange"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    {BUDGET_RANGES.map((budget) => (
                      <label
                        key={budget}
                        onClick={() => field.onChange(budget)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors",
                          field.value === budget
                            ? "border-brand bg-brand/10 text-foreground"
                            : "border-border bg-surface/60 text-muted-foreground",
                        )}
                      >
                        <RadioGroupItem value={budget} />
                        {BUDGET_RANGE_LABELS[budget]}
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.budgetRange ? (
                <p className="mt-2 text-xs text-danger">{errors.budgetRange.message}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="mb-1.5 block text-sm text-foreground">
                  Name
                </Label>
                <Input id="name" {...register("name")} placeholder="Jane Doe" />
                {errors.name ? (
                  <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="email" className="mb-1.5 block text-sm text-foreground">
                  Email
                </Label>
                <Input id="email" type="email" {...register("email")} placeholder="jane@company.com" />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="phone" className="mb-1.5 block text-sm text-foreground">
                  Phone <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="phone" {...register("phone")} placeholder="+971 5X XXX XXXX" />
              </div>
              <div>
                <Label htmlFor="company" className="mb-1.5 block text-sm text-foreground">
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="company" {...register("company")} placeholder="Company name" />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="mb-1.5 block text-sm text-foreground">
                Anything else we should know?{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Tell us a bit about the project, links, references..."
                rows={4}
              />
            </div>
          </div>
        ) : null}

        {submitError ? <p className="mt-4 text-sm text-danger">{submitError}</p> : null}

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className={step === 0 ? "invisible" : ""}
          >
            Back
          </Button>
          {isLastStep ? (
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Send request
            </Button>
          ) : (
            <Button type="button" onClick={goNext}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
