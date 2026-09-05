import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';

const RiskMap = () => {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Urban Flood Risk Map</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Visualize flood risk across different urban locations.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search Location" 
          style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '8px',
            color: 'white',
            outline: 'none',
            flex: 1
          }}
        />
        <select style={{
            padding: '0.75rem',
            backgroundColor: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '8px',
            color: 'white',
            outline: 'none',
            width: '200px'
          }}>
          <option>All Risks</option>
          <option>Low Risk</option>
          <option>Medium Risk</option>
          <option>High Risk</option>
        </select>
        <button style={{
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0.2) 100%)',
          border: '1px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Apply Filters
        </button>
      </div>

      <GlassCard style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {/* Placeholder for map */}
        <h2 style={{ color: 'var(--text-secondary)' }}>Map Visualization Area</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Interactive map markers will render here when geographic coordinates are provided.
        </p>
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed var(--text-secondary)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
          "Location coordinates are not available in the current dataset."
        </div>
      </GlassCard>
    </div>
  );
};

export default RiskMap;
