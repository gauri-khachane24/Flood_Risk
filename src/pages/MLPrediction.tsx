import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

const MLPrediction = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Flood Prediction Model</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Machine learning models estimate flood occurrence using environmental and historical features.
        </p>
      </header>

      {/* ML Pipeline Visual */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3rem 0', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}>DATA</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}>CLEANING</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}>FEATURES</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}>SPLIT</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.1)', border: '1px solid var(--accent-cyan)', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,229,255,0.3)' }}>TRAINING</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}>EVALUATION</div>
        <div style={{ color: 'var(--accent-cyan)' }}>→</div>
        <div style={{ flex: 1, padding: '15px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '8px', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>PREDICTION</div>
      </div>

      <h3 style={{ marginBottom: '1.5rem' }}>Model Comparison <span style={{fontSize:'0.8rem', color: 'var(--text-secondary)', fontWeight:'normal'}}>DEMO DATA</span></h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <GlassCard>
          <h4 style={{ margin: '0 0 1rem 0' }}>Evaluation Metrics (Random Forest)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Accuracy</p>
              <h2 className="glow-text" style={{ margin: 0 }}>92.4%</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Precision</p>
              <h2 className="glow-text" style={{ margin: 0 }}>89.1%</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Recall</p>
              <h2 className="glow-text" style={{ margin: 0 }}>94.3%</h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>F1 Score</p>
              <h2 className="glow-text" style={{ margin: 0 }}>91.6%</h2>
            </div>
          </div>
        </GlassCard>

        <GlassCard style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,229,255,0.2)', color: 'var(--accent-cyan)' }}>
                <th style={{ padding: '10px' }}>Model</th>
                <th style={{ padding: '10px' }}>Accuracy</th>
                <th style={{ padding: '10px' }}>Precision</th>
                <th style={{ padding: '10px' }}>Recall</th>
                <th style={{ padding: '10px' }}>F1 Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy data */}
              {['Logistic Regression', 'Decision Tree', 'Random Forest'].map((model, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px' }}>{model}</td>
                  <td style={{ padding: '10px' }}>{(78 + i*7).toFixed(1)}%</td>
                  <td style={{ padding: '10px' }}>{(75 + i*7).toFixed(1)}%</td>
                  <td style={{ padding: '10px' }}>{(80 + i*7).toFixed(1)}%</td>
                  <td style={{ padding: '10px' }}>{(77 + i*7).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
};

export default MLPrediction;
