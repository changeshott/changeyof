"use client";

import { useState } from "react";
import { generateMcpKey } from "@/app/actions/mcp";
import { Copy, RefreshCw, CheckCircle2, Server, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function McpClient({ projectId, initialKey }: { projectId: string, initialKey: string | null }) {
  const [apiKey, setApiKey] = useState<string | null>(initialKey);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleGenerateKey = async () => {
    if (apiKey && !confirm("Are you sure you want to regenerate your MCP API Key? The old key will stop working immediately.")) {
      return;
    }
    
    setIsGenerating(true);
    const result = await generateMcpKey(projectId);
    if (result.success && result.key) {
      setApiKey(result.key);
    } else {
      alert("Failed to generate key.");
    }
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string, type: 'key' | 'config') => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  const mcpConfig = `{
  "mcpServers": {
    "changeyof-server": {
      "command": "npx",
      "args": ["-y", "@changeyof/mcp-server"],
      "env": {
        "CHANGEYOF_PROJECT_ID": "${projectId}",
        "CHANGEYOF_API_KEY": "${apiKey || 'cf_mcp_YOUR_API_KEY'}"
      }
    }
  }
}`;

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings Panel */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <Server className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Connection Settings</h2>
            <p className="text-sm text-slate-400">Generate credentials for your AI agents.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Project ID</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-slate-400 select-all">
              {projectId}
            </div>
            <p className="mt-2 text-xs text-slate-500">Your unique project identifier.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">MCP API Key</label>
            {!apiKey ? (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-slate-400 mb-4">No API key generated yet.</p>
                <button
                  onClick={handleGenerateKey}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Generate API Key"}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 font-mono text-sm text-slate-200 blur-[4px] hover:blur-none transition-all cursor-crosshair">
                    {apiKey}
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey, 'key')}
                    className="h-[46px] px-4 bg-white/10 border border-l-0 border-white/10 rounded-r-lg hover:bg-white/20 transition-colors flex items-center justify-center min-w-[50px]"
                  >
                    {copiedKey ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-500">Hover to reveal. Keep this key secret.</p>
                  <button 
                    onClick={handleGenerateKey}
                    disabled={isGenerating}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Snippet Panel */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <Terminal className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Claude Desktop Config</h2>
            <p className="text-sm text-slate-400">Add this to your Claude Desktop config file.</p>
          </div>
        </div>
        
        <div className="flex-1 relative bg-black/50 border border-white/10 rounded-xl overflow-hidden group">
          <button 
            onClick={() => copyToClipboard(mcpConfig, 'config')}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-slate-300 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-xs font-medium"
          >
            {copiedConfig ? (
              <><CheckCircle2 className="w-3 h-3 text-green-400" /> Copied</>
            ) : (
              <><Copy className="w-3 h-3" /> Copy JSON</>
            )}
          </button>
          
          <pre className="p-6 overflow-x-auto text-sm text-slate-300 font-mono">
            <code>{mcpConfig}</code>
          </pre>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Typically located at: <br/>
          <code className="text-slate-400">~/Library/Application Support/Claude/claude_desktop_config.json</code> (Mac) or <br/>
          <code className="text-slate-400">%APPDATA%\Claude\claude_desktop_config.json</code> (Windows)
        </p>
      </div>
    </div>
  );
}
