import React from 'react';
import { GlassCard } from './GlassCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CloudRain, Waves, Info } from 'lucide-react';

export interface ChartDataPoint {
  time: string;
  value: number;
}

const defaultRainfallData: ChartDataPoint[] = [
  { time: '00:00', value: 20 },
  { time: '04:00', value: 35 },
  { time: '08:00', value: 85 },
  { time: '12:00', value: 150 },
  { time: '16:00', value: 110 },
  { time: '20:00', value: 60 },
  { time: '24:00', value: 30 },
];

const defaultWaterLevelData: ChartDataPoint[] = [
  { time: '00:00', value: 1.2 },
  { time: '04:00', value: 1.4 },
  { time: '08:00', value: 1.9 },
  { time: '12:00', value: 2.5 },
  { time: '16:00', value: 2.3 },
  { time: '20:00', value: 1.8 },
  { time: '24:00', value: 1.5 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  unit: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-xl text-xs">
        <p className="text-slate-500 font-semibold mb-1">{`Time: ${label}`}</p>
        <p className="text-blue-600 font-black text-sm">
          {`Value: ${payload[0].value} ${unit}`}
        </p>
      </div>
    );
  }
  return null;
};

export const RainfallChart: React.FC<{ data?: ChartDataPoint[] }> = ({
  data = defaultRainfallData,
}) => {
  return (
    <GlassCard className="p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100">
            <CloudRain className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Rainfall Trend</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase tracking-wider">
            DEMO DATA
          </span>
          <div className="group relative cursor-pointer">
            <Info className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            <div className="absolute right-0 top-6 hidden group-hover:block w-48 p-2.5 bg-slate-900 text-[10px] text-slate-200 rounded-xl border border-slate-700 z-50 shadow-xl">
              Illustrative trend data for academic analysis purposes.
            </div>
          </div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="rainGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fontWeight: 500 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11, fontWeight: 500 }} />
            <Tooltip content={<CustomTooltip unit="mm" />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0284c7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#rainGradientLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export const WaterLevelChart: React.FC<{ data?: ChartDataPoint[] }> = ({
  data = defaultWaterLevelData,
}) => {
  return (
    <GlassCard className="p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
            <Waves className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Water Level Trend</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            DEMO DATA
          </span>
          <div className="group relative cursor-pointer">
            <Info className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            <div className="absolute right-0 top-6 hidden group-hover:block w-48 p-2.5 bg-slate-900 text-[10px] text-slate-200 rounded-xl border border-slate-700 z-50 shadow-xl">
              Illustrative trend data for academic analysis purposes.
            </div>
          </div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waterGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fontWeight: 500 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11, fontWeight: 500 }} />
            <Tooltip content={<CustomTooltip unit="m" />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#waterGradientLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
