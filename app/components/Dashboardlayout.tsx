import React from "react";
import { Link } from "@remix-run/react";
import JoinOrg from "~/routes/dashboard/join-org";
import CreateOrg from "~/routes/dashboard/create-org";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showCreateOrg: boolean;
  closeCreateOrg: () => void;
  showJoinOrg: boolean;
  closeJoinOrg: () => void;
  openCreateOrg: () => void;
  openJoinOrg: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showCreateOrg,
  closeCreateOrg,
  showJoinOrg,
  closeJoinOrg,
  openCreateOrg,
  openJoinOrg,
}) => {
  // ...
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white px-4 py-3">
        <div className="logo">LOGO</div>
        <nav className="flex items-center justify-center flex-grow space-x-6">
          {/* Change userData to openCreateOrg and openJoinOrg */}
          {openCreateOrg && openJoinOrg && (
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
        <div className="user-icon">{/* ... */}</div>
      </header>
      <div className="flex-grow">{children}</div>

      {/* Modals */}
      {showCreateOrg && <CreateOrg closeModal={closeCreateOrg} />}
      {showJoinOrg && <JoinOrg closeModal={closeJoinOrg} />}
    </div>
  );
};

export default DashboardLayout;
