import React from "react";
import DashboardLayout from "~/components/Dashboardlayout";
import { useLoaderData } from "@remix-run/react";
import { fetch } from "@remix-run/node";
import OrganizationCard from "~/components/OrganizationCard";

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

  // Conditionally render the components based on the user's organizations
  return (
    <DashboardLayout>
      {organizations && organizations.length === 0 ? (
        <div>
          <h2>Welcome! Please create or join an organization.</h2>
        </div>
      ) : (
        <div>
          <h2>Your Organizations</h2>
          <div>
            {organizations?.map(
              ({ org: { id, name, description } }: any, index: number) => (
                <OrganizationCard key={index} id={id} name={name} description={description} />
              )
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
