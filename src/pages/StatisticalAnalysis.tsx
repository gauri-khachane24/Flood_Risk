import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';

const StatisticalAnalysis = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Statistical Analysis</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Determine whether environmental variables have statistically significant associations with flooding.
        </p>
      </header>

      <GlassCard style={{ borderLeft: '4px solid var(--accent-cyan)', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent-cyan)', margin: '0 0 1rem 0' }}>Research Question</h3>
        <h2 style={{ margin: 0 }}>Does heavy rainfall have a statistically significant association with flood occurrence?</h2>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <GlassCard style={{ border: '1px dashed var(--text-secondary)' }}>
          <h3 style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>H₀ — Null Hypothesis</h3>
          <p style={{ fontSize: '1.2rem' }}>Heavy rainfall and flooding are <strong>not</strong> associated.</p>
        </GlassCard>

        <GlassCard style={{ border: '1px solid var(--accent-cyan)', boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)' }}>
          <h3 style={{ color: 'var(--accent-cyan)', margin: '0 0 1rem 0' }}>H₁ — Alternative Hypothesis</h3>
          <p style={{ fontSize: '1.2rem' }}>Heavy rainfall and flooding <strong>are</strong> associated.</p>
        </GlassCard>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Chi-Square Test Result <Badge level="LOW" /> {/* Using Badge just for styling demo label */} <span style={{fontSize:'0.8rem', color: 'var(--text-secondary)'}}>DEMO DATA</span></h2>

      <GlassCard>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Chi-square statistic:</p>
            <h2 style={{ margin: '0 0 1.5rem 0', color: 'white' }}>42.85</h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Significance level (α):</p>
            <h2 style={{ margin: 0, color: 'white' }}>0.05</h2>
          </div>
          
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>p-value:</p>
            <h2 className="glow-text" style={{ margin: '0 0 1.5rem 0' }}>0.00001</h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Conclusion:</p>
            <h2 style={{ margin: 0, color: 'var(--risk-low)' }}>✓ Significant Association</h2>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'var(--text-primary)' }}>
            <strong>Interpretation:</strong> Since the p-value (0.00001) is less than the significance level (0.05), we reject the null hypothesis. 
            There is a statistically significant association between heavy rainfall and flood occurrence in the dataset.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default StatisticalAnalysis;
