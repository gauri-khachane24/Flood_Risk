import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

const About = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>About the Project</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <GlassCard style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--accent-cyan)', margin: '0 0 1rem 0' }}>Problem Statement</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
              Urban flooding can be influenced by rainfall, water levels, elevation, drainage conditions and historical flood patterns. 
              This project explores these factors and develops a data-driven approach for estimating flood risk.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 style={{ color: 'var(--accent-cyan)', margin: '0 0 1.5rem 0' }}>Project Workflow</h3>
            <div style={{ fontSize: '1.1rem', lineHeight: 2, display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <strong>Data Collection</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>Data Cleaning</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>EDA</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>Statistical Analysis</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>Machine Learning</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>Risk Prediction</strong> <span style={{ color: 'var(--accent-cyan)' }}>→</span> 
              <strong>Visualization</strong>
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard>
            <h3 style={{ color: 'var(--accent-cyan)', margin: '0 0 1rem 0' }}>Technologies</h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
              <li>Python</li>
              <li>Pandas</li>
              <li>NumPy</li>
              <li>Matplotlib</li>
              <li>Seaborn</li>
              <li>Scikit-learn</li>
              <li>React</li>
              <li>Vite</li>
              <li>TypeScript</li>
            </ul>
          </GlassCard>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <i>"This application is developed as an academic project for data exploration, visualization and machine learning. 
        It is not an official emergency warning or disaster-management system."</i>
      </div>
    </div>
  );
};

export default About;
