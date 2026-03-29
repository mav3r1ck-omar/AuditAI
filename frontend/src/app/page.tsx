"use client"
import React, { useState } from 'react';
import { runSEOAudit } from '@/app/actions';
import { SiteHealthChart } from '@/components/dashboard/SiteHealthChart';
import { KeywordDensityChart } from '@/components/dashboard/KeywordDensityChart';
import { AISuggestions } from '@/components/dashboard/AISuggestions';
import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { Search, Activity, Globe, Zap, ArrowRight, ShieldCheck, BarChart3, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    let target = url;
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }

    setLoading(true);
    setError("");
    setReport(null);

    const data = await runSEOAudit(target);
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setReport(data);
    }
  };

  const startNew = () => {
    setReport(null);
    setUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden relative flex flex-col pt-16">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-900/30 via-purple-900/10 to-transparent blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={startNew}>
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <img src="/logo.png" alt="AuditAI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">AuditAI</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 md:py-12 relative z-10 flex-1 flex flex-col">
        {!report ? (
          <div className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto text-center space-y-12 animate-in fade-in zoom-in duration-700">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Zap className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                V2.0 Core Intelligence Engine Live
              </div>
              <h1 className="text-5xl md:text-[5rem] font-extrabold tracking-tight text-white !leading-[1.1] pb-2">
                Uncover your site&apos;s <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">true potential.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Deep-dive into technical SEO metadata, analyze keyword density automatically, and accelerate your growth with actionable AI-driven strategies. Instantly.
              </p>
            </div>

            <form onSubmit={handleAudit} className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
              <div className="relative flex items-center bg-[#090e1a]/90 backdrop-blur-xl rounded-full shadow-2xl overflow-hidden border border-slate-700 focus-within:border-indigo-500/80 transition-colors p-1.5 pl-5 z-10">
                <div className="text-slate-500 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <Input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your domain (e.g., example.com)..."
                  className="flex-1 bg-transparent border-none text-white text-lg h-14 focus-visible:ring-0 px-4 placeholder:text-slate-600 font-medium relative z-20 disabled:bg-transparent! dark:disabled:bg-transparent!"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={loading || !url.trim()} 
                  className={`rounded-full bg-slate-100 hover:bg-white text-slate-900 font-bold text-base h-14 px-8 shadow-lg transition-transform hover:scale-[1.02] active:scale-95 ml-2 relative z-20 flex items-center justify-center ${loading || !url.trim() ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                     <div className="flex items-center gap-2">
                       <div className="w-5 h-5 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                       Scanning...
                     </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Run Audit
                      <ArrowRight className="w-4 h-4 ml-1 stroke-[3px]" />
                    </div>
                  )}
                </button>
              </div>
              {error && <p className="text-rose-400/90 mt-5 text-sm font-semibold filter drop-shadow bg-rose-500/10 px-4 py-2 rounded-lg max-w-max mx-auto border border-rose-500/20">{error}</p>}
            </form>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-800/60 w-full mt-12">
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex flex-col items-center justify-center border border-blue-500/20 shadow-inner"><Search className="text-blue-400 w-7 h-7" /></div>
                 <h3 className="text-white font-bold text-xl tracking-tight">Deep Scraping</h3>
                 <p className="text-slate-400/80 text-sm leading-relaxed max-w-[250px]">Puppeteer engine extracts critical DOM metadata, canonicals, and links structure seamlessly.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex flex-col items-center justify-center border border-emerald-500/20 shadow-inner"><ShieldCheck className="text-emerald-400 w-7 h-7" /></div>
                 <h3 className="text-white font-bold text-xl tracking-tight">Health Verification</h3>
                 <p className="text-slate-400/80 text-sm leading-relaxed max-w-[250px]">Synthesizes ranking logic and infrastructure descriptions against Google Lighthouse standards.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex flex-col items-center justify-center border border-purple-500/20 shadow-inner"><BarChart3 className="text-purple-400 w-7 h-7" /></div>
                 <h3 className="text-white font-bold text-xl tracking-tight">Keyword Synthesis</h3>
                 <p className="text-slate-400/80 text-sm leading-relaxed max-w-[250px]">AI models rapidly pinpoint thematic topic clusters and evaluate content density mathematically.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 w-full max-w-[1400px] mx-auto mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-800/80">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Audit Complete
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">SEO Report</h1>
                <p className="text-slate-400 mt-2 flex items-center gap-2 text-base">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 font-medium hover:underline transition-colors">{url}</a>
                </p>
              </div>
              <Button onClick={startNew} variant="outline" className="border-slate-700 bg-[#0f172a] hover:bg-slate-800 text-slate-200 rounded-full shadow-lg font-semibold h-11 px-6">
                 <RotateCcw className="w-4 h-4 mr-2 text-slate-400" />
                Analyze Rescan
              </Button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch pt-2">
               {/* Left Column (Charts and Suggestions) */}
               <div className="xl:col-span-8 flex flex-col gap-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <SiteHealthChart score={report.siteHealth} />
                     <KeywordDensityChart data={report.keywordDensity} />
                  </div>
                  <div className="flex-1 min-h-[400px]">
                     <AISuggestions suggestions={report.aiSuggestions} />
                  </div>
               </div>
               
               {/* Right Column (Chatbot) */}
               <div className="xl:col-span-4 h-[750px] xl:h-auto min-h-[600px] shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)] rounded-xl">
                  <ChatInterface report={report} />
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
