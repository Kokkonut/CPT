import React from 'react';

interface OrganizationDashboardLayoutProps {
  children: React.ReactNode;
  orgData: {
    name: string;
  };
}

const OrganizationDashboardLayout: React.FC<OrganizationDashboardLayoutProps> = ({
  children,
  orgData,
}) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <div className="text-lg font-semibold">Your Logo</div>
        <div className="text-lg font-semibold">{orgData.name}</div>
      </header>

      {/* Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <nav className="w-1/4 p-4 bg-blue-100">
          {/* Add your navigation items here */}
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </nav>

        {/* Main content */}
        <main className="w-3/4 p-4">{children}</main>
      </div>
    </div>
  );
};

export default OrganizationDashboardLayout;
