"use client";

import { useState, useTransition } from "react";

import { updateLeadNotes, updateLeadStatus } from "@/app/admin/(protected)/leads/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Tables } from "@/lib/supabase/types";

const STATUSES = ["new", "contacted", "won", "lost"] as const;

export function LeadRow({ lead }: { lead: Tables<"leads"> }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(next: string | null) {
    if (!next) return;
    setStatus(next);
    startTransition(() => updateLeadStatus(lead.id, next));
  }

  function handleSaveNotes() {
    startTransition(() => updateLeadNotes(lead.id, notes));
  }

  return (
    <tr className="border-b border-border align-top last:border-0">
      <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
        {new Date(lead.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-3">
        <p className="text-sm font-medium text-foreground">{lead.name}</p>
        <p className="text-xs text-muted-foreground">{lead.email}</p>
        {lead.company ? <p className="text-xs text-muted-foreground">{lead.company}</p> : null}
      </td>
      <td className="px-3 py-3 text-sm text-foreground/90">{lead.project_type}</td>
      <td className="px-3 py-3 text-sm text-foreground/90">
        {lead.budget_range}
        <br />
        <span className="text-xs text-muted-foreground">{lead.timeline}</span>
      </td>
      <td className="px-3 py-3">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>
      <td className="min-w-56 px-3 py-3">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Internal notes..."
          className="text-xs"
        />
        <Button
          type="button"
          size="xs"
          variant="ghost"
          className="mt-1"
          disabled={isPending}
          onClick={handleSaveNotes}
        >
          Save notes
        </Button>
      </td>
    </tr>
  );
}
