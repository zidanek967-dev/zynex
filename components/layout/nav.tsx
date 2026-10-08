"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  return (
    <motion.header
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: { paddingTop: 20, paddingBottom: 20 },
        scrolled: { paddingTop: 10, paddingBottom: 10 },
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-colors duration-300 sm:px-6",
          scrolled && "glass glow-border fx-card",
        )}
      >
        <Link href="/" className="py-1" aria-label="ZYNEX home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-foreground",
                  isActive && "text-primary-foreground hover:text-primary-foreground",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="bg-gradient-brand absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <MagneticButton>
            <Button render={<Link href="/contact" />}>Get a Quote</Button>
          </MagneticButton>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden" })}
            aria-label="Open menu"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="glass border-border">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 font-mono text-sm tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:bg-white/5 hover:text-foreground",
                        (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) &&
                          "bg-white/5 text-brand",
                      )}
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <SheetClose render={<Link href="/contact" className={buttonVariants({ className: "w-full" })} />}>
                Get a Quote
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
