import React from 'react';

type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

interface BadgeProps {
  level: RiskLevel;
}

export const Badge: React.FC<BadgeProps> = ({ level }) => {
  const getStyle = () => {
    switch (level) {
      case 'LOW':
        return { bg: 'rgba(16, 185, 129, 0.2)', text: 'var(--risk-low)' };
      case 'MEDIUM':
        return { bg: 'rgba(245, 158, 11, 0.2)', text: 'var(--risk-medium)' };
      case 'HIGH':
        return { bg: 'rgba(239, 68, 68, 0.2)', text: 'var(--risk-high)' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.2)', text: 'var(--text-secondary)' };
    }
  };

  const style = getStyle();

  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.text,
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      display: 'inline-block'
    }}>
      {level}
    </span>
  );
};
