"use client";
import MarkdownIt from "markdown-it";

export default function Description({ text }: { text: string | undefined }) {
  const mdParser = new MarkdownIt({
    typographer: true,
    breaks: true,
    linkify: true,
    xhtmlOut: true,
  });
  return (
    <div
      className="prose prose-slate"
      dangerouslySetInnerHTML={{
        __html: mdParser.render(`${text}`),
      }}
    />
  );
}
