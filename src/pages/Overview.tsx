import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { KpiGrid } from '../components/KpiCard';
import { RiskGauge } from '../components/RiskGauge';
import { RiskScale } from '../components/RiskScale';
import { RainfallChart, WaterLevelChart } from '../components/Charts';
import { ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner (Light Theme) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-slate-50/80 to-cyan-50/90 p-8 border border-slate-200/80 shadow-sm">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-extrabold tracking-widest uppercase mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart City Command Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            URBAN FLOOD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600">
              RISK & ROAD SAFETY ANALYZER
            </span>
          </h1>

          <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            "Data-driven flood intelligence for safer and smarter urban environments."
          </p>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <KpiGrid />

      {/* Main Analytics Grid: Risk Score Card & Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Large Current Flood Risk Card (5 cols) */}
        <GlassCard className="lg:col-span-5 p-7 flex flex-col justify-between items-center text-center relative">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse" />
              <h3 className="text-xs font-black tracking-widest text-slate-700 uppercase">
                CURRENT FLOOD RISK
              </h3>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 font-mono">
              LIVE SCORE
            </span>
          </div>

          {/* Circular Risk Gauge Component */}
          <RiskGauge
            score={84}
            maxScore={100}
            label="HIGH RISK"
            subtitle="Project-defined Risk Score"
          />

          {/* LOW -> MEDIUM -> HIGH Risk Scale Component */}
          <RiskScale score={84} />
        </GlassCard>

        {/* Trend Charts Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                Hydrological Telemetry Trends
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium font-mono">
              Real-time monitoring demo
            </span>
          </div>

          <RainfallChart />
          <WaterLevelChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
