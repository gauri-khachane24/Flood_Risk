import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert } from 'lucide-react';

const RoadSafety = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Flood-Affected Road Safety</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Identify areas where flooding may create potential road safety concerns.
        </p>
      </header>

      <div style={{ 
        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
        borderLeft: '4px solid var(--risk-high)', 
        padding: '1.5rem', 
        borderRadius: '4px', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <ShieldAlert size={32} color="var(--risk-high)" />
        <div>
          <h3 style={{ color: 'var(--risk-high)', margin: '0 0 0.5rem 0' }}>Potential Road Hazard</h3>
          <p style={{ margin: 0, color: 'var(--text-primary)' }}>Elevated water levels in <strong>Downtown</strong> may affect road accessibility.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { title: 'High Risk Roads', value: '12' },
          { title: 'Waterlogged Areas', value: '5' },
          { title: 'Unsafe Routes', value: '3' },
          { title: 'Flood-Prone Intersections', value: '8' }
        ].map((kpi, idx) => (
          <GlassCard key={idx}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {kpi.title}
            </div>
            <div className="glow-text" style={{ fontSize: '2rem' }}>{kpi.value}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 style={{ marginBottom: '1.5rem' }}>Road Risk Assessment</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,229,255,0.2)', color: 'var(--accent-cyan)' }}>
              <th style={{ padding: '15px 10px' }}>Area</th>
              <th style={{ padding: '15px 10px' }}>Road Type</th>
              <th style={{ padding: '15px 10px' }}>Rainfall (mm)</th>
              <th style={{ padding: '15px 10px' }}>Water Level (m)</th>
              <th style={{ padding: '15px 10px' }}>Flood Risk</th>
              <th style={{ padding: '15px 10px' }}>Road Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { area: 'Downtown', type: 'Highway', rain: 150.5, water: 3.2, risk: 'HIGH', status: 'Avoid' },
              { area: 'North Riverside', type: 'Residential', rain: 45.2, water: 0.5, risk: 'LOW', status: 'Clear' },
              { area: 'South Valley', type: 'Arterial', rain: 110.0, water: 2.1, risk: 'MEDIUM', status: 'Caution' }
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 10px' }}>{row.area}</td>
                <td style={{ padding: '15px 10px' }}>{row.type}</td>
                <td style={{ padding: '15px 10px' }}>{row.rain}</td>
                <td style={{ padding: '15px 10px' }}>{row.water}</td>
                <td style={{ padding: '15px 10px' }}><Badge level={row.risk as 'LOW' | 'MEDIUM' | 'HIGH'} /></td>
                <td style={{ padding: '15px 10px', color: row.risk === 'HIGH' ? 'var(--risk-high)' : row.risk === 'MEDIUM' ? 'var(--risk-medium)' : 'var(--risk-low)' }}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default RoadSafety;
