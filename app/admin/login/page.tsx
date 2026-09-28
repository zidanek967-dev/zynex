import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Log in" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass glow-border w-full max-w-sm rounded-3xl border border-border p-8">
        <h1 className="font-display text-xl font-semibold text-foreground">ZYNEX Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in with a magic link.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
