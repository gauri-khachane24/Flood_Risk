import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import RiskAnalyzer from './pages/RiskAnalyzer';
import DataExploration from './pages/DataExploration';
import StatisticalAnalysis from './pages/StatisticalAnalysis';
import MLPrediction from './pages/MLPrediction';
import RiskMap from './pages/RiskMap';
import RoadSafety from './pages/RoadSafety';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="analyzer" element={<RiskAnalyzer />} />
          <Route path="exploration" element={<DataExploration />} />
          <Route path="statistics" element={<StatisticalAnalysis />} />
          <Route path="ml-prediction" element={<MLPrediction />} />
          <Route path="risk-map" element={<RiskMap />} />
          <Route path="road-safety" element={<RoadSafety />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
