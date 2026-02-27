"use client";

import React from "react";

type PlaceholderSegment =
  | { type: "text"; value: string }
  | { type: "image"; path: string; alt: string }
  | { type: "video"; path: string };

/** Splits content by [IMAGE:path:alt] and [VIDEO:path] so we can render placeholders. */
function splitByPlaceholders(str: string): PlaceholderSegment[] {
  const segments: PlaceholderSegment[] = [];
  const imageRe = /\[IMAGE:([^\]:]+)(?::([^\]]*))?\]/g;
  const videoRe = /\[VIDEO:([^\]]+)\]/g;
  const all: { index: number; type: "image" | "video"; path: string; alt?: string }[] = [];
  let m;
  imageRe.lastIndex = 0;
  while ((m = imageRe.exec(str)) !== null) all.push({ index: m.index, type: "image", path: m[1], alt: m[2] ?? m[1] });
  videoRe.lastIndex = 0;
  while ((m = videoRe.exec(str)) !== null) all.push({ index: m.index, type: "video", path: m[1] });
  all.sort((a, b) => a.index - b.index);

  let last = 0;
  for (const item of all) {
    if (item.index > last) segments.push({ type: "text", value: str.slice(last, item.index) });
    if (item.type === "image") segments.push({ type: "image", path: item.path, alt: item.alt ?? item.path });
    else segments.push({ type: "video", path: item.path });
    last = item.index + (item.type === "image" ? `[IMAGE:${item.path}${item.alt ? ":" + item.alt : ""}]` : `[VIDEO:${item.path}]`).length;
  }
  if (last < str.length) segments.push({ type: "text", value: str.slice(last) });
  return segments.length ? segments : [{ type: "text", value: str }];
}

function renderPlaceholderSegment(seg: PlaceholderSegment, key: number): React.ReactNode {
  if (seg.type === "text") return <React.Fragment key={key}>{inlineFormatBoldAndCode(seg.value)}</React.Fragment>;
  if (seg.type === "video") {
    return (
      <figure key={key} className="my-8">
        <div className="aspect-video w-full rounded-xl bg-primary-800/50 border border-white/10 flex flex-col items-center justify-center gap-3 p-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7L8 5z"/></svg>
          </div>
          <p className="text-white/80 font-medium">Video placeholder</p>
          <p className="text-sm text-white/50">Replace with your video: <code className="px-2 py-0.5 rounded bg-black/20">{seg.path}</code></p>
          <p className="text-xs text-white/40">Upload your file and use the path in place of this placeholder.</p>
        </div>
        <figcaption className="mt-2 text-center text-sm text-white/50">Video: {seg.path}</figcaption>
      </figure>
    );
  }
  return (
    <figure key={key} className="my-8">
      <div className="rounded-xl overflow-hidden bg-primary-800/50 border border-white/10 aspect-video flex flex-col items-center justify-center gap-3 p-8">
        <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <p className="text-white/80 font-medium">Image placeholder</p>
        <p className="text-sm text-white/50">Replace with your image: <code className="px-2 py-0.5 rounded bg-black/20">{seg.path}</code></p>
        {seg.alt && seg.alt !== seg.path && <p className="text-xs text-white/40">Alt: {seg.alt}</p>}
      </div>
      <figcaption className="mt-2 text-center text-sm text-white/50">{seg.alt}</figcaption>
    </figure>
  );
}

/** Bold and code only; placeholders handled separately. */
function inlineFormatBoldAndCode(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;
  const boldRe = /\*\*([^*]+)\*\*/g;
  const codeRe = /`([^`]+)`/g;
  let lastIndex = 0;
  let remaining = text;
  const matches: { index: number; end: number; type: "bold" | "code"; value: string }[] = [];
  let match;
  boldRe.lastIndex = 0;
  while ((match = boldRe.exec(remaining)) !== null) matches.push({ index: match.index, end: match.index + match[0].length, type: "bold", value: match[1] });
  codeRe.lastIndex = 0;
  while ((match = codeRe.exec(remaining)) !== null) matches.push({ index: match.index, end: match.index + match[0].length, type: "code", value: match[1] });
  matches.sort((a, b) => a.index - b.index);
  for (const m of matches) {
    if (m.index > lastIndex) parts.push(<React.Fragment key={key++}>{remaining.slice(lastIndex, m.index)}</React.Fragment>);
    parts.push(<React.Fragment key={key++}>{m.type === "bold" ? <strong className="font-semibold text-foreground">{m.value}</strong> : <code className="px-1.5 py-0.5 rounded bg-black/20 text-sm font-mono">{m.value}</code>}</React.Fragment>);
    lastIndex = m.end;
  }
  if (lastIndex < remaining.length) parts.push(<React.Fragment key={key++}>{remaining.slice(lastIndex)}</React.Fragment>);
  return parts.length > 0 ? <>{parts}</> : text;
}

function parsePlaceholdersAndFormat(str: string): React.ReactNode {
  const segments = splitByPlaceholders(str);
  return <>{segments.map((seg, i) => renderPlaceholderSegment(seg, i))}</>;
}

type Block = { type: "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "code" | "blockquote"; content: string; lang?: string };

function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.split("\n");
  let i = 0;
  let inCode = false;
  let codeContent: string[] = [];
  let codeLang = "";

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        codeContent = [];
      } else {
        inCode = false;
        blocks.push({ type: "code", content: codeContent.join("\n"), lang: codeLang });
      }
      i++;
      continue;
    }
    if (inCode) {
      codeContent.push(line);
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", content: line.slice(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", content: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", content: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("> ")) {
      blocks.push({ type: "blockquote", content: line.slice(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [line.slice(2).trim()];
      i++;
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", content: items.join("\n") });
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [line.replace(/^\d+\.\s/, "")];
      i++;
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", content: items.join("\n") });
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !lines[i].startsWith("-") && !lines[i].startsWith("*") && !lines[i].match(/^\d+\.\s/) && !lines[i].startsWith("```")) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", content: para.join("\n").trim() });
  }

  return blocks;
}

/** For headings/lists: bold and code only. For paragraphs: bold, code, and placeholders. */
function inlineFormat(text: string, allowPlaceholders = false): React.ReactNode {
  return allowPlaceholders ? parsePlaceholdersAndFormat(text) : inlineFormatBoldAndCode(text);
}

export function BlogContent({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <article className="blog-content">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <h1 key={idx} className="text-3xl md:text-4xl font-bold mt-10 mb-4 first:mt-0 scroll-mt-24">
                {inlineFormat(block.content)}
              </h1>
            );
          case "h2":
            return (
              <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-24 border-b border-white/10 pb-2">
                {inlineFormat(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={idx} className="text-xl font-bold mt-8 mb-3 scroll-mt-24">
                {inlineFormat(block.content)}
              </h3>
            );
          case "p": {
            const segments = splitByPlaceholders(block.content);
            const hasBlockPlaceholders = segments.some((s) => s.type === "image" || s.type === "video");
            if (hasBlockPlaceholders) {
              return (
                <div key={idx} className="my-6 space-y-4">
                  {segments.map((seg, i) =>
                    seg.type === "text" ? (
                      <p key={i} className="my-4 leading-relaxed text-white/90">
                        {inlineFormatBoldAndCode(seg.value)}
                      </p>
                    ) : (
                      <React.Fragment key={i}>{renderPlaceholderSegment(seg, i)}</React.Fragment>
                    )
                  )}
                </div>
              );
            }
            return (
              <p key={idx} className="my-4 leading-relaxed text-white/90">
                {inlineFormat(block.content, true)}
              </p>
            );
          }
          case "ul": {
            const items = block.content.split("\n").filter(Boolean);
            return (
              <ul key={idx} className="my-4 list-disc list-inside space-y-2 text-white/90 pl-2">
                {items.map((item, j) => (
                  <li key={j}>{inlineFormat(item)}</li>
                ))}
              </ul>
            );
          }
          case "ol": {
            const items = block.content.split("\n").filter(Boolean);
            return (
              <ol key={idx} className="my-4 list-decimal list-inside space-y-2 text-white/90 pl-2">
                {items.map((item, j) => (
                  <li key={j}>{inlineFormat(item)}</li>
                ))}
              </ol>
            );
          }
          case "blockquote":
            return (
              <blockquote key={idx} className="my-6 pl-6 border-l-4 border-orange-500/60 text-white/80 italic">
                {inlineFormat(block.content)}
              </blockquote>
            );
          case "code":
            return (
              <pre key={idx} className="my-6 overflow-x-auto rounded-xl bg-black/40 p-4 border border-white/10">
                <code className="text-sm font-mono text-white/90">{block.content}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
