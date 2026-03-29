"use client"
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function SiteHealthChart({ score }: { score: number }) {
  // Enhanced color scaling logic
  const color = score >= 80 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const data = [{ name: "Health", score, fill: color }];

  return (
    <Card className="flex flex-col h-full bg-[#0b1120] border border-slate-800/60 rounded-2xl text-white shadow-xl overflow-hidden relative group transition-all duration-500 hover:border-slate-700">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-950/50 z-0"></div>
      
      {/* Decorative colored glow based on score */}
      <div 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[80px] rounded-full opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: color }}
      ></div>

      <CardHeader className="relative z-10 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold tracking-tight text-white/90">Site Health</CardTitle>
          <div className="w-8 h-8 rounded-full bg-slate-800/40 flex items-center justify-center border border-slate-700/50 backdrop-blur-md">
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="h-[240px] w-full relative group-hover:scale-[1.02] transition-transform duration-500">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" cy="50%" 
              innerRadius="75%" outerRadius="90%" 
              barSize={12} 
              data={data} 
              startAngle={220} endAngle={-40}
            >
              {/* PolarAngleAxis enables the start/end bounds for the chart cleanly */}
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar 
                background={{ fill: '#1e293b' }} 
                dataKey="score" 
                cornerRadius={12} 
                isAnimationActive={true}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
            <span className="text-[4rem] font-black tracking-tighter leading-none" style={{ color, textShadow: `0 0 20px ${color}40` }}>
              {score}
            </span>
            <span className="text-[10px] font-bold text-slate-500 mt-2 tracking-[0.25em] uppercase">Score</span>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col items-center justify-center gap-3">
          <p className="text-center text-sm font-medium" style={{ color }}>
            {score >= 80 ? "Excellent SEO foundation!" : score >= 50 ? "Needs optimization." : "Critical SEO issues detected."}
          </p>
          <div className="h-1.5 w-full max-w-[200px] bg-slate-800 rounded-full flex overflow-hidden opacity-60">
            {/* Contextual mini-bar indicating health ranges */}
            <div className="h-full bg-red-500 w-[40%]"></div>
            <div className="h-full bg-amber-500 w-[40%]"></div>
            <div className="h-full bg-emerald-500 w-[20%]"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
