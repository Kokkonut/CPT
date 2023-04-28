import React from "react";
import DashboardLayout from "~/components/Dashboardlayout";
import CreateOrg from "./CreateOrg";
import JoinOrg from "./JoinOrg";
import { useLoaderData } from "@remix-run/react";
import { fetch } from "@remix-run/node";
// TODO: fix this linting error
import type { LoaderContext } from "@remix-run/react";

export async function loader({ request }: LoaderContext) {
  const cookie = request.headers.get("cookie");

  const response = await fetch("http://localhost:3000/api/user/data", {
    headers: {
      cookie: cookie, // Pass the cookies along with the request
    },
  });
  console.log("response received", response);
  const data = await response.json();
  console.log('data', data);
  return data;
}

const Dashboard: React.FC = () => {
  const { organizations } = useLoaderData();
  console.log('organizations in dashboard', organizations);

  // Conditionally render the components based on the user's organizations
  return (
    <DashboardLayout>
      {organizations && organizations.length === 0 ? (
        <>
          <CreateOrg />
          <JoinOrg />
        </>
      ) : (
        <div>
          <h2>Your Organizations</h2>
          <ul>
            {organizations?.map(({ org: { name, description } }: any, index: number) => (
              <li key={index}>
                <h3>{name}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
