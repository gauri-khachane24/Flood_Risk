import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Gauge } from '../components/ui/Gauge';
import { Activity } from 'lucide-react';

const RiskAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; level: 'LOW' | 'MEDIUM' | 'HIGH'; prob: number } | null>(null);

  const [formData, setFormData] = useState({
    location: 'Downtown',
    rainfall: 120.5,
    waterLevel: 2.1,
    elevation: 45.0,
    prevFlood: 'Yes',
    drainage: 'Average',
    popDensity: 'High',
    roadType: 'Arterial'
  });

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const predictRisk = (data: typeof formData) => {
        let score = 40;
        if (data.rainfall > 100) score += 25;
        if (data.waterLevel > 2) score += 20;
        if (data.prevFlood === 'Yes') score += 10;
        if (data.elevation < 50) score += 5;
        
        score = Math.min(100, score);
        let level: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
        if (score > 33) level = 'MEDIUM';
        if (score > 66) level = 'HIGH';
        
        return { score, level, prob: parseFloat((score * 0.95).toFixed(1)) };
      };
      
      setResult(predictRisk(formData));
      setAnalyzing(false);
    }, 1500);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    color: '#0f172a',
    outline: 'none',
    marginTop: '0.5rem',
    fontWeight: 500
  };

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800, color: '#0f172a' }}>Analyze Flood Risk</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Enter environmental conditions to estimate the flood risk of an area.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <GlassCard>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 700 }}>
            <Activity size={20} className="text-blue-600" /> Input Parameters
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Location / Area</label>
              <select style={inputStyle} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}>
                <option>Downtown</option>
                <option>North Riverside</option>
                <option>South Valley</option>
              </select>
            </div>
            
            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Previous Flood</label>
              <select style={inputStyle} value={formData.prevFlood} onChange={e => setFormData({...formData, prevFlood: e.target.value})}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Rainfall (mm)</label>
              <input type="number" style={inputStyle} value={formData.rainfall} onChange={e => setFormData({...formData, rainfall: parseFloat(e.target.value)})} />
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Water Level (m)</label>
              <input type="number" style={inputStyle} value={formData.waterLevel} onChange={e => setFormData({...formData, waterLevel: parseFloat(e.target.value)})} />
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Elevation (m)</label>
              <input type="number" style={inputStyle} value={formData.elevation} onChange={e => setFormData({...formData, elevation: parseFloat(e.target.value)})} />
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Drainage Capacity</label>
              <select style={inputStyle} value={formData.drainage} onChange={e => setFormData({...formData, drainage: e.target.value})}>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{
              width: '100%',
              padding: '1rem',
              marginTop: '2rem',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
            }}
          >
            {analyzing ? 'ANALYZING...' : 'ANALYZE RISK →'}
          </button>
        </GlassCard>

        {result ? (
          <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '2rem', color: '#64748b', fontWeight: 700 }}>FLOOD RISK RESULT</h3>
            <Gauge 
              value={result.score} 
              color={result.level === 'LOW' ? '#10b981' : result.level === 'MEDIUM' ? '#d97706' : '#dc2626'} 
              size={240}
            />
            <h2 style={{ 
              marginTop: '2rem', 
              color: result.level === 'LOW' ? '#10b981' : result.level === 'MEDIUM' ? '#d97706' : '#dc2626',
              fontWeight: 800
            }}>
              {result.level} RISK
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem' }}>
              Probability: <strong style={{ color: '#0f172a' }}>{result.prob}%</strong>
            </p>
          </GlassCard>
        ) : (
          <GlassCard style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>
            <p style={{ color: '#64748b', textAlign: 'center', fontWeight: 500 }}>
              Fill in the parameters and click Analyze Risk<br/>to generate a prediction.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default RiskAnalyzer;
