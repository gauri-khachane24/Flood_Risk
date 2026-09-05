import React from 'react';

interface GaugeProps {
  value: number;
  max?: number;
  size?: number;
  color?: string;
  label?: string;
}

export const Gauge: React.FC<GaugeProps> = ({ 
  value, 
  max = 100, 
  size = 200, 
  color = '#0284c7',
  label
}) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={size * 0.1}
        />
        {/* Value circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.1}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <h2 style={{ fontSize: `${size * 0.25}px`, margin: 0, color: '#0f172a', fontWeight: 900 }}>
          {value}
        </h2>
        <span style={{ color: '#64748b', fontSize: `${size * 0.1}px`, fontWeight: 600 }}>/ {max}</span>
        {label && <div style={{ color, fontWeight: 'bold', marginTop: '5px' }}>{label}</div>}
      </div>
    </div>
  );
};
