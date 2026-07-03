"use client";

import ReactMarkdown from "react-markdown";
import { Sparkles, Zap, Bug, Shield, Tag } from "lucide-react";

interface MarkdownPreviewProps {
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export default function MarkdownPreview({ title, content, date, tags }: MarkdownPreviewProps) {
  // Determine primary type icon based on first tag
  const primaryTag = tags.length > 0 ? tags[0] : "New";
  
  const getIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "new":
        return <Sparkles className="w-3.5 h-3.5 text-neutral-700" />;
      case "improvement":
        return <Zap className="w-3.5 h-3.5 text-neutral-700" />;
      case "fix":
        return <Bug className="w-3.5 h-3.5 text-neutral-700" />;
      case "security":
        return <Shield className="w-3.5 h-3.5 text-neutral-700" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-neutral-500" />;
    }
  };

  const getTagStyle = () => {
    // Sleek monochrome style for all tags
    return "bg-neutral-100 text-neutral-600 border border-neutral-200";
  };

  return (
    <div className="bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-full text-black">
      {/* Widget Header Mockup */}
      <div className="bg-[#111] p-4 border-b border-[#222] text-white shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-[10px]">
            cf
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">Widget Preview</h3>
            <p className="text-white/40 text-[10px] mt-1 font-medium tracking-wide uppercase">Live changes as you type</p>
          </div>
        </div>
      </div>

      {/* Widget Body Mockup (Changelog Item) */}
      <div className="p-5 flex gap-4 overflow-y-auto flex-1 custom-scrollbar">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200">
            {getIcon(primaryTag)}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${getTagStyle()}`}>
                  {tag}
                </span>
              ))}
              {tags.length === 0 && (
                 <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${getTagStyle()}`}>
                  No Tags
                 </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-400 font-medium">{date}</span>
          </div>
          <h4 className="text-[15px] font-bold text-neutral-900 mb-3 leading-snug">
            {title || "Untitled Release"}
          </h4>
          
          <div className="text-[13px] text-neutral-600 leading-relaxed prose prose-sm prose-neutral prose-a:text-blue-600 prose-headings:text-neutral-900 prose-headings:font-semibold prose-code:text-neutral-800 prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md max-w-none">
            {content ? (
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => {
                    const href = props.href || "";
                    // YouTube Embed
                    if (href.includes("youtube.com/watch?v=") || href.includes("youtu.be/")) {
                      const videoId = href.includes("v=") ? href.split("v=")[1].split("&")[0] : href.split("youtu.be/")[1]?.split("?")[0];
                      return (
                        <div className="my-4 aspect-video rounded-lg overflow-hidden border border-neutral-200">
                          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      );
                    }
                    // Loom Embed
                    if (href.includes("loom.com/share/")) {
                      const videoId = href.split("share/")[1]?.split("?")[0];
                      return (
                        <div className="my-4 aspect-video rounded-lg overflow-hidden border border-neutral-200">
                          <iframe width="100%" height="100%" src={`https://www.loom.com/embed/${videoId}`} frameBorder="0" allowFullScreen></iframe>
                        </div>
                      );
                    }
                    return <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>;
                  }
                }}
              >{content}</ReactMarkdown>
            ) : (
              <p className="text-neutral-400 italic">Start typing on the left to see the preview here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
