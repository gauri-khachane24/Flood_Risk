import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ShieldCheck, MapPin } from 'lucide-react';

export const Topbar: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path || path === 'overview') return 'Overview Dashboard';
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/70 flex items-center justify-between px-8 sticky top-0 z-40 shadow-xs">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {getPageTitle()}
        </h2>
      </div>

      {/* Center Location Search Bar (matching screenshot search bar) */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search location or keyword..."
            className="w-full bg-[#f0f4f9] border border-slate-200/80 text-slate-800 text-sm rounded-full pl-11 pr-24 py-2.5 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-200 shadow-2xs">
            <MapPin className="w-3 h-3 text-blue-600 mr-1" />
            Zone A
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* System Online Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>System Online</span>
        </div>

        {/* Bell Button */}
        <button className="relative p-2.5 rounded-full bg-[#f0f4f9] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
