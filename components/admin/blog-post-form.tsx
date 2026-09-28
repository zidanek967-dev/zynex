import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Tables } from "@/lib/supabase/types";

export function BlogPostForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<Tables<"blog_posts">>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={defaultValues?.title} required />
        <Field label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
      </div>

      <Field label="Excerpt" name="excerpt" defaultValue={defaultValues?.excerpt} textarea required />
      <Field
        label="Content (Markdown)"
        name="content"
        defaultValue={defaultValues?.content}
        textarea
        rows={12}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Category" name="category" defaultValue={defaultValues?.category ?? "General"} />
        <Field
          label="Reading time (min)"
          name="reading_time_minutes"
          type="number"
          defaultValue={String(defaultValues?.reading_time_minutes ?? 4)}
        />
        <Field
          label="Author name"
          name="author_name"
          defaultValue={defaultValues?.author_name ?? "ZYNEX Team"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Cover image URL"
          name="cover_image_url"
          defaultValue={defaultValues?.cover_image_url ?? ""}
        />
        <Field label="OG image URL" name="og_image_url" defaultValue={defaultValues?.og_image_url ?? ""} />
      </div>

      <label className="flex w-fit items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="size-4 accent-brand"
        />
        Published
      </label>

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
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  rows?: number;
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
          rows={rows}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
        />
      )}
    </div>
  );
}
