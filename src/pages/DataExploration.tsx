import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const dummyDistData = [
  { range: '0-50', count: 120 }, { range: '51-100', count: 250 }, { range: '101-150', count: 180 },
  { range: '151-200', count: 90 }, { range: '201-250', count: 40 }, { range: '>250', count: 15 }
];

const dummyScatterData = Array.from({ length: 50 }).map((_, i) => ({
  x: Math.random() * 200 + 50,
  y: Math.random() > 0.5 ? 1 : 0,
  z: Math.random() * 100
}));

const DataExploration = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Explore the Data</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Discover patterns, distributions and relationships within the flood dataset.
        </p>
      </header>

      {/* Dataset Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { title: 'Total Records', value: '5,240' },
          { title: 'Variables', value: '12' },
          { title: 'Missing Values', value: '0' },
          { title: 'Duplicate Records', value: '0' }
        ].map((kpi, idx) => (
          <GlassCard key={idx}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {kpi.title}
            </div>
            <div className="glow-text" style={{ fontSize: '2rem' }}>{kpi.value}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <GlassCard>
          <h4 style={{ marginBottom: '1.5rem' }}>1. Rainfall Distribution</h4>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-cyan)' }} />
                <Bar dataKey="count" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>Key Insight:</strong> Most rainfall events cluster around 50-150mm.
          </p>
        </GlassCard>

        <GlassCard>
          <h4 style={{ marginBottom: '1.5rem' }}>2. Rainfall vs Flood Occurrence</h4>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="x" type="number" name="Rainfall" unit="mm" stroke="var(--text-secondary)" />
                <YAxis dataKey="y" type="number" name="Flood" stroke="var(--text-secondary)" ticks={[0, 1]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'var(--bg-primary)' }} />
                <Scatter data={dummyScatterData} fill="var(--accent-cyan)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>Key Insight:</strong> Higher rainfall shows a strong cluster at Flood=1.
          </p>
        </GlassCard>
        
        {/* Placeholder for remaining charts */}
        <GlassCard style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Additional charts (Water Level vs Flood, Correlation Heatmap) will render here once real dataset is connected.</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default DataExploration;
