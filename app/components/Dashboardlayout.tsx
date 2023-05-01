import React, { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { CreateOrgProps } from "~/routes/dashboard/create-org";
import { JoinOrgProps } from "~/routes/dashboard/join-org";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const userData = useLoaderData();
  console.log("userData in dashboard layout", userData);

  return (
    <div>
      <header>
        <div className="logo">LOGO</div>
      </header>
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
            showNav ? "block" : "hidden lg:block"
          }`}
        >
          {userData && userData.organizations.length > 0 && (
            <>
              <Link to="/dashboard/create-org">
                Create Organization
              </Link>
              <Link to="/dashboard/join-org">
                Join Organization
              </Link>
            </>
          )}
        </nav>

        {/* Main view area */}
        <main className="flex-grow bg-gray-100 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
