"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AISuggestions({ suggestions }: { suggestions: string[] }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <Card className="flex flex-col h-full bg-slate-900 border-none rounded-xl text-white shadow-lg overflow-hidden relative group transition-all duration-300 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-teal-500/10 opacity-50 z-0"></div>
      <CardHeader className="relative z-10 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          <CardTitle className="text-xl font-bold tracking-tight text-white/90">Actionable Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative z-10">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex gap-4 items-start bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 shadow-sm hover:bg-slate-800/80 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-slate-300 text-[15px] leading-relaxed font-medium">{suggestion}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
