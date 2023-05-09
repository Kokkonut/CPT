import React, { useState } from "react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import { Link, useLoaderData } from "@remix-run/react";
import OrganizationCard from "~/components/OrganizationCard";
// import CreateOrg from "~/routes/dashboard/create-org";
// import JoinOrg from "~/routes/dashboard/join-org";

export async function loader({ request }: LoaderContext) {
  const cookie = request.headers.get("cookie");

  const response = await fetch("http://localhost:3000/api/user/data", {
    headers: {
      cookie: cookie, // Pass the cookies along with the request
    },
  });

  const data = await response.json();

  return data;
}

const Dashboard: React.FC = () => {
  const { organizations } = useLoaderData();

  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showJoinOrg, setShowJoinOrg] = useState(false);

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
    <DashboardLayout
      showCreateOrg={showCreateOrg}
      closeCreateOrg={closeCreateOrg}
      showJoinOrg={showJoinOrg}
      closeJoinOrg={closeJoinOrg}
      openCreateOrg={openCreateOrg}
      openJoinOrg={openJoinOrg}
    >
      {organizations && organizations.length === 0 ? (
        <div>
          <h2>
            Welcome! Please{" "}
            <Link to="#" onClick={openCreateOrg}>
              create
            </Link>{" "}
            or join an organization.
          </h2>
        </div>
      ) : (
        <div>
          <h2>Your Organizations</h2>
          <div>
            {organizations?.map(
              ({ org: { _id, name, description } }: any, index: number) => (
                <OrganizationCard
                  key={index}
                  id={_id}
                  name={name}
                  description={description}
                />
              )
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
