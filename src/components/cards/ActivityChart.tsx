"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ActivityChartProps {
  className?: string;
}

const generateMockData = () => {
  const today = new Date();
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const baseViews = 50 + (6 - i) * 20;
    const views = Math.floor(baseViews + Math.random() * 40);
    const reactions = Math.floor(views * 0.3 + Math.random() * 10);
    
    result.push({
      date: dateStr,
      views,
      reactions,
    });
  }
  return result;
};

const mockData = generateMockData();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-xl text-sm">
        <p className="text-slate-400 mb-2 font-medium">{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white capitalize">{entry.name}:</span>
            <span className="font-bold ml-auto">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityChart({ className = "" }: ActivityChartProps) {
  // Generate mock data for the last 7 days
  const data = mockData;



  return (
    <div className={`bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group ${className}`}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20/5 blur-3xl pointer-events-none rounded-full transition-opacity group-hover:bg-white/5"></div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Engagement Trend</h3>
        <p className="text-sm text-slate-400">Views and reactions over the last 7 days</p>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area 
              type="monotone" 
              dataKey="views" 
              name="Views"
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorViews)" 
              activeDot={{ r: 6, fill: '#6366f1', stroke: '#111', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="reactions" 
              name="Reactions"
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorReactions)" 
              activeDot={{ r: 6, fill: '#10b981', stroke: '#111', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
