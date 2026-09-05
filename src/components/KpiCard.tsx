import React from 'react';
import { GlassCard } from './GlassCard';
import { CloudRain, Waves, Mountain, AlertTriangle, LucideIcon, TrendingUp } from 'lucide-react';

export interface KpiData {
  id: string;
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trendText: string;
  badgeText: string;
}

interface KpiCardProps {
  data: KpiData;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const Icon = data.icon;

  return (
    <GlassCard className="p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            {data.title}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 tracking-wider uppercase">
            {data.badgeText}
          </span>
        </div>

        <div className="flex items-center space-x-3 my-2">
          <div className={`p-3 rounded-2xl ${data.bgColor} border border-slate-200/60`}>
            <Icon className={`w-6 h-6 ${data.color}`} />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {data.value}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center text-emerald-600 font-bold">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>{data.trendText}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Verified Telemetry</span>
      </div>
    </GlassCard>
  );
};

export const KpiGrid: React.FC = () => {
  const defaultKpis: KpiData[] = [
    {
      id: 'rainfall',
      title: 'Rainfall',
      value: '150 mm',
      icon: CloudRain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trendText: 'High accumulation',
      badgeText: 'DEMO DATA',
    },
    {
      id: 'water_level',
      title: 'Water Level',
      value: '2.5 m',
      icon: Waves,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      trendText: '+0.4m from baseline',
      badgeText: 'DEMO DATA',
    },
    {
      id: 'elevation',
      title: 'Elevation',
      value: '540 m',
      icon: Mountain,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      trendText: 'Topographical height',
      badgeText: 'DEMO DATA',
    },
    {
      id: 'prev_flood',
      title: 'Previous Flood',
      value: 'YES',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      trendText: 'Historical vulnerability',
      badgeText: 'DEMO DATA',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {defaultKpis.map((kpi) => (
        <KpiCard key={kpi.id} data={kpi} />
      ))}
    </div>
  );
};

export default KpiCard;
