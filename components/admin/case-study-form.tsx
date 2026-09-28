import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Tables } from "@/lib/supabase/types";

export function CaseStudyForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<Tables<"case_studies">>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={defaultValues?.title} required />
        <Field label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
      </div>

      <Field
        label="Summary"
        name="summary"
        defaultValue={defaultValues?.summary}
        textarea
        required
      />
      <Field label="Problem" name="problem" defaultValue={defaultValues?.problem} textarea required />
      <Field
        label="Solution"
        name="solution"
        defaultValue={defaultValues?.solution}
        textarea
        required
      />
      <Field label="Results" name="results" defaultValue={defaultValues?.results} textarea required />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Client name" name="client_name" defaultValue={defaultValues?.client_name ?? ""} />
        <Field label="Industry" name="industry" defaultValue={defaultValues?.industry ?? ""} />
      </div>

      <Field
        label="Tech stack (comma-separated)"
        name="stack"
        defaultValue={defaultValues?.stack?.join(", ")}
        placeholder="Next.js, Supabase, Tailwind"
      />

      <Field
        label="Cover image URL"
        name="cover_image_url"
        defaultValue={defaultValues?.cover_image_url ?? ""}
      />
      <Field
        label="Gallery image URLs (comma-separated)"
        name="gallery_image_urls"
        defaultValue={defaultValues?.gallery_image_urls?.join(", ")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(defaultValues?.sort_order ?? 0)}
        />
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="published"
              defaultChecked={defaultValues?.published ?? true}
              className="size-4 accent-brand"
            />
            Published
          </label>
        </div>
      </div>

      <Button type="submit" className="w-fit">
        {submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  textarea,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} className="mb-1.5 block text-sm text-foreground">
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          required={required}
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
