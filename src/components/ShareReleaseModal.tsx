"use client";

import { useState, useRef } from "react";
import { X, Download, Share2, Image as ImageIcon } from "lucide-react";
import * as htmlToImage from "html-to-image";
import MarkdownPreview from "@/components/MarkdownPreview";
import { motion, AnimatePresence } from "framer-motion";

interface ShareReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  release: any;
  projectDomain?: string;
}

export default function ShareReleaseModal({ isOpen, onClose, release, projectDomain }: ShareReleaseModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !release) return null;

  const releaseUrl = projectDomain ? `${projectDomain}/${release.project_id}` : `${window.location.origin}/widget/${release.project_id}`;

  const shareToX = () => {
    const tweetText = `🚀 Update: ${release.title}\n\n${release.content.substring(0, 150)}...\n\nRead more: ${releaseUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  const downloadImage = async (format: "png" | "jpeg") => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      // Small delay to ensure styles are applied
      await new Promise(r => setTimeout(r, 100));
      
      const dataUrl = format === "png" 
        ? await htmlToImage.toPng(previewRef.current, { quality: 1, pixelRatio: 2, backgroundColor: '#050505' })
        : await htmlToImage.toJpeg(previewRef.current, { quality: 1, pixelRatio: 2, backgroundColor: '#050505' });
      
      const link = document.createElement("a");
      link.download = `${release.slug || 'release'}-${format === 'png' ? 'changelog.png' : 'changelog.jpg'}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* Left Side: Preview for Export */}
          <div className="flex-1 bg-[#050505] p-8 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Export Preview
            </div>
            
            <div 
              ref={previewRef}
              className="w-full max-w-[400px] bg-[#050505] p-6 rounded-xl border border-white/5"
            >
              <MarkdownPreview 
                title={release.title}
                content={release.content}
                date={release.published_at ? new Date(release.published_at).toLocaleDateString() : "Just now"}
                tags={Array.isArray(release.tags) ? release.tags : []}
              />
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="w-full md:w-80 p-6 flex flex-col bg-[#111] relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mt-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Share Release</h2>
              <p className="text-sm text-slate-400">
                Your release is public! Share it with your audience or export it as a beautiful image for social media.
              </p>
            </div>

            <div className="space-y-3 flex-1">
              <button 
                onClick={shareToX}
                className="w-full flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#1DA1F2] group-hover:text-white transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm">Share to X (Twitter)</span>
                </div>
                <Share2 className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>

              <button 
                onClick={() => downloadImage("png")}
                disabled={isExporting}
                className="w-full flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Download as PNG</span>
                    <span className="text-[10px] text-slate-500">High quality image</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>

              <button 
                onClick={() => downloadImage("jpeg")}
                disabled={isExporting}
                className="w-full flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Download as JPG</span>
                    <span className="text-[10px] text-slate-500">Smaller file size</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
