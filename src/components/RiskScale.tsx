import React from 'react';

interface RiskScaleProps {
  score: number; // 0 to 100
}

export const RiskScale: React.FC<RiskScaleProps> = ({ score = 84 }) => {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="w-full mt-6 pt-4 border-t border-slate-100">
      {/* Label Headers */}
      <div className="flex justify-between text-xs font-bold tracking-wider mb-2">
        <span className="text-emerald-600 flex items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
          LOW
        </span>
        <span className="text-amber-600 flex items-center">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
          MEDIUM
        </span>
        <span className="text-red-600 flex items-center">
          <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
          HIGH
        </span>
      </div>

      {/* Risk Gradient Track */}
      <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-visible p-[2px] border border-slate-200">
        <div 
          className="w-full h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 opacity-90"
        />

        {/* Current Score Marker Pin */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -ml-2 transition-all duration-700 ease-out"
          style={{ left: `${clampedScore}%` }}
        >
          <div className="w-4 h-6 bg-slate-900 rounded-sm border-2 border-white shadow-md flex items-center justify-center">
            <div className="w-0.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Numeric Scale Legend */}
      <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 font-medium">
        <span>0</span>
        <span>33</span>
        <span>66</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default RiskScale;
