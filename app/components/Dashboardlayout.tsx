import React, { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import JoinOrg from "~/routes/dashboard/join-org";
import CreateOrg from "~/routes/dashboard/create-org";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showJoinOrg, setShowJoinOrg] = useState(false);

  const userData = useLoaderData();

  function openCreateOrg() {
    setShowCreateOrg(true);
  }

  function closeCreateOrg() {
    setShowCreateOrg(false);
  }

  function openJoinOrg() {
    setShowJoinOrg(true);
  }

  function closeJoinOrg() {
    setShowJoinOrg(false);
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white px-4 py-3">
        <div className="logo">LOGO</div>
        <nav className="flex items-center justify-center flex-grow space-x-6">
          {userData && userData.organizations.length > 0 && (
            <>
              <Link to="#" onClick={openCreateOrg}>
                Create Organization
              </Link>
              <Link to="#" onClick={openJoinOrg}>
                Join Organization
              </Link>
            </>
          )}
        </nav>
        <div className="user-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </header>
      <div className="flex-grow">
        {children}
      </div>

      {/* Modals */}
      {showCreateOrg && <CreateOrg closeModal={closeCreateOrg} />}
      {showJoinOrg && <JoinOrg closeModal={closeJoinOrg} />}
    </div>
  );
};

export default DashboardLayout;
