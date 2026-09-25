import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 font-display text-2xl font-semibold text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 flex flex-col gap-2 pl-5">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-5 flex list-decimal flex-col gap-2 pl-5">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="list-disc text-foreground/90 marker:text-brand">{children}</li>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-brand underline underline-offset-4 hover:text-foreground"
    >
      {children}
    </Link>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-brand pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    // Fenced code blocks get a "language-*" className from remark and are
    // already wrapped in <pre> below; only bare inline `code` needs styling.
    if (className) return <code className={className}>{children}</code>;
    return (
      <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-brand-2">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-5 overflow-x-auto rounded-2xl border border-border bg-surface-2 p-4 font-mono text-sm text-foreground/90">
      {children}
    </pre>
  ),
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
