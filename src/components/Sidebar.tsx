import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  TrendingUp,
  Brain,
  MapPin,
  ShieldAlert,
  Info,
  Waves,
  ShieldCheck,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Overview', path: '/overview', icon: LayoutDashboard },
    { name: 'Risk Analyzer', path: '/analyzer', icon: Activity },
    { name: 'Data Exploration', path: '/exploration', icon: BarChart3 },
    { name: 'Statistical Analysis', path: '/statistics', icon: TrendingUp },
    { name: 'ML Prediction', path: '/ml-prediction', icon: Brain },
    { name: 'Risk Map', path: '/risk-map', icon: MapPin },
    { name: 'Road Safety', path: '/road-safety', icon: ShieldAlert },
    { name: 'About Project', path: '/about', icon: Info },
  ];

  return (
    <aside className="w-72 h-screen bg-[#eef3f8] border-r border-slate-200/80 flex flex-col fixed left-0 top-0 z-50 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-6 pb-4 border-b border-slate-200/60 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
          <Waves className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">
            🌊 URBAN FLOOD
          </h1>
          <p className="text-[10px] font-bold tracking-[0.2em] text-blue-600 mt-1 uppercase">
            INTELLIGENCE
          </p>
        </div>
      </div>

      {/* Main Menu Label */}
      <div className="px-6 pt-6 pb-2">
        <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
          MAIN MENU
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-lg shadow-slate-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mr-3.5 transition-colors duration-200 ${
                      isActive ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Card Footer (matching profile card in screenshot) */}
      <div className="p-4 m-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-800">SYSTEM ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-400">Live Telemetry Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
