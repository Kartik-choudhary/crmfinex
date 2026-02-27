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
    const videoSrc = seg.path.startsWith("/") || seg.path.startsWith("http") ? seg.path : `/blog/${seg.path}`;
    return (
      <figure key={key} className="my-8">
        <div className="rounded-xl overflow-hidden border border-foreground/10 bg-foreground/5 aspect-video">
          <video
            src={videoSrc}
            controls
            className="w-full h-full object-contain"
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <figcaption className="mt-2 text-center text-sm text-foreground/60">Video: {seg.path}</figcaption>
      </figure>
    );
  }
  // Resolve image src: paths starting with / or http are used as-is; otherwise serve from /blog/
  const imgSrc = seg.path.startsWith("/") || seg.path.startsWith("http") ? seg.path : `/blog/${seg.path}`;
  return (
    <figure key={key} className="my-8">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-primary-800/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={seg.alt} className="w-full h-auto object-contain" />
      </div>
      {seg.alt && <figcaption className="mt-2 text-center text-sm text-foreground/60">{seg.alt}</figcaption>}
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
    parts.push(<React.Fragment key={key++}>{m.type === "bold" ? <strong className="font-semibold text-foreground">{m.value}</strong> : <code className="px-1.5 py-0.5 rounded bg-foreground/15 text-foreground text-sm font-mono">{m.value}</code>}</React.Fragment>);
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

  const articleCls = "blog-content text-foreground break-words whitespace-normal";
  const pCls = "my-4 leading-relaxed text-foreground/90 max-w-none";
  const listCls = "my-4 list-disc list-inside space-y-2 text-foreground/90 pl-4";
  const listItemCls = "leading-relaxed";

  return (
    <article className={articleCls}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <h1 key={idx} className="text-3xl md:text-4xl font-bold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-24">
                {inlineFormat(block.content)}
              </h1>
            );
          case "h2":
            return (
              <h2 key={idx} className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24 border-b border-foreground/15 pb-2">
                {inlineFormat(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-3 scroll-mt-24">
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
                      <p key={i} className={pCls}>
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
              <p key={idx} className={pCls}>
                {inlineFormat(block.content, true)}
              </p>
            );
          }
          case "ul": {
            const items = block.content.split("\n").filter(Boolean);
            return (
              <ul key={idx} className={listCls}>
                {items.map((item, j) => (
                  <li key={j} className={listItemCls}>{inlineFormat(item)}</li>
                ))}
              </ul>
            );
          }
          case "ol": {
            const items = block.content.split("\n").filter(Boolean);
            return (
              <ol key={idx} className="my-4 list-decimal list-inside space-y-2 text-foreground/90 pl-6">
                {items.map((item, j) => (
                  <li key={j} className={listItemCls}>{inlineFormat(item)}</li>
                ))}
              </ol>
            );
          }
          case "blockquote":
            return (
              <blockquote key={idx} className="my-6 pl-6 border-l-4 border-orange-500/60 text-foreground/80 italic">
                {inlineFormat(block.content)}
              </blockquote>
            );
          case "code":
            return (
              <pre key={idx} className="my-6 overflow-x-auto rounded-xl bg-foreground/10 p-4 border border-foreground/10">
                <code className="text-sm font-mono text-foreground/90">{block.content}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
