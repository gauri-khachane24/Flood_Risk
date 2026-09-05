import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#f0f4f9] text-slate-900 font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 ml-72 flex flex-col min-w-0">
        <Topbar />
        
        {/* Main Content Viewport */}
        <main className="p-8 flex-1 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
