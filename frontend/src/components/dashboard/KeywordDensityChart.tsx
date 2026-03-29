"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function KeywordDensityChart({ data }: { data: { keyword: string, count: number, density: number }[] }) {
  if (!data || data.length === 0) return null;

  // Cap at 8 keywords for cleaner design aesthetics
  const sortedData = [...data].sort((a, b) => b.density - a.density).slice(0, 8);

  // Custom label to show percentage immediately right of the bar cleanly
  const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width + 8} 
        y={y + height / 2} 
        fill="#94a3b8" 
        dy={4} 
        fontSize={12} 
        fontWeight={600}
      >
        {Number(value || 0).toFixed(1)}%
      </text>
    );
  };

  return (
    <Card className="flex flex-col h-full bg-[#0b1120] border border-slate-800/60 rounded-2xl text-white shadow-xl overflow-hidden relative group transition-all duration-300 hover:border-slate-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-teal-500/5 z-0 pointer-events-none"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <div className="flex justify-between items-center">
        <CardTitle className="text-lg font-bold tracking-tight text-white/90">Keyword Density</CardTitle>
          <div className="w-8 h-8 rounded-full bg-slate-800/40 flex items-center justify-center border border-slate-700/50 backdrop-blur-md">
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-[400px] p-6 pt-6 relative z-10">
        <div className="h-full w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={380}>
            <BarChart 
              data={sortedData} 
              layout="vertical" 
              margin={{ top: 10, right: 70, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <XAxis type="number" hide domain={[0, 'dataMax + 5']} />
              <YAxis 
                type="category" 
                dataKey="keyword" 
                width={120} 
                stroke="#94a3b8" 
                fontSize={13} 
                fontWeight={600} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={12}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 4 }} 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #334155', 
                  borderRadius: '12px', 
                  color: '#fff', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
                  padding: '12px'
                }}
                itemStyle={{ color: '#c084fc', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value: any, name: any, props: any) => [
                  `${Number(value || 0).toFixed(2)}% (${props.payload.count} occurrences)`, 
                  'Density'
                ]} 
              />
              <Bar 
                dataKey="density" 
                radius={[0, 10, 10, 0]} 
                barSize={24}
                label={<CustomLabel />}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="url(#barGradient)" 
                    className="hover:opacity-90 transition-opacity duration-300 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
