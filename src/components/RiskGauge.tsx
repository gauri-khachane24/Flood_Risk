import React from 'react';

interface RiskGaugeProps {
  score: number; // 0 to 100
  maxScore?: number;
  label?: string;
  subtitle?: string;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score = 84,
  maxScore = 100,
  label = 'HIGH RISK',
  subtitle = 'Project-defined Risk Score',
  size = 220,
}) => {
  const getRiskDetails = (value: number) => {
    if (value < 40) {
      return {
        color: '#10b981', // Green
        glowColor: 'rgba(16, 185, 129, 0.25)',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        text: 'LOW RISK',
      };
    } else if (value < 70) {
      return {
        color: '#d97706', // Amber
        glowColor: 'rgba(217, 119, 6, 0.25)',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        text: 'MEDIUM RISK',
      };
    } else {
      return {
        color: '#dc2626', // Red
        glowColor: 'rgba(220, 38, 38, 0.25)',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        text: 'HIGH RISK',
      };
    }
  };

  const riskInfo = getRiskDetails(score);
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), maxScore) / maxScore;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      {/* SVG Circular Gauge */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Light background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={riskInfo.color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 4px 12px ${riskInfo.glowColor})`,
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline space-x-1">
            <span
              className="text-5xl font-black tracking-tight text-slate-900"
            >
              {score}
            </span>
            <span className="text-sm font-bold text-slate-400">/ {maxScore}</span>
          </div>
          <span
            className={`mt-2 px-3 py-1 rounded-full text-xs font-black tracking-wider border ${riskInfo.bgColor} ${riskInfo.textColor} ${riskInfo.borderColor} shadow-xs`}
          >
            {label || riskInfo.text}
          </span>
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs font-semibold text-slate-500 text-center tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default RiskGauge;
