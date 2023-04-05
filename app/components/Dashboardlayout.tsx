import React, { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Mobile navigation toggle button */}
      <button
        className="lg:hidden bg-gray-900 text-white p-4"
        onClick={() => setShowNav(!showNav)}
      >
        Menu
      </button>

      {/* Navigation */}
      <nav
        className={`lg:w-1/4 bg-gray-900 text-white p-4 lg:py-0 lg:px-8 lg:flex flex-col ${
            showNav ? 'block' : 'hidden lg:block'
          }`}
          
      >
        {/* Add your navigation menu items here */}
        <h3>one</h3>
        <h3>two</h3>
        <h3>three</h3>
      </nav>

      {/* Main view area */}
      <main className="flex-grow bg-gray-100 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
