import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, style }) => {
  return (
    <div 
      onClick={onClick}
      style={style}
      className={`relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-blue-300/80 hover:shadow-[0_10px_30px_-4px_rgba(37,99,235,0.08)] ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
