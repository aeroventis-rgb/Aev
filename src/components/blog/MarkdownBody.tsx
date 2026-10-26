import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 text-xl font-black uppercase tracking-wide text-brand-blue">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-xl font-black uppercase tracking-wide text-brand-blue">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 text-base font-black uppercase tracking-wide text-brand-ink">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-brand-navy/80 md:text-base">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm leading-relaxed text-brand-navy/80 md:text-base">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-brand-ink">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="font-bold text-brand-blue underline-offset-4 hover:underline">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto rounded-md border border-brand-silver">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-brand-silver bg-brand-off px-3 py-2 font-bold text-brand-ink">{children}</th>,
  td: ({ children }) => <td className="border-b border-brand-silver px-3 py-2 align-top text-brand-navy/80">{children}</td>,
};

export function MarkdownBody({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{markdown}</ReactMarkdown>;
}
