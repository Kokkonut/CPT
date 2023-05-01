import React from 'react';
import { useLoaderData } from '@remix-run/react';
import OrganizationDashboardLayout from '~/components/OrganizationDashboardLayout';

export async function loader({ request, params }: LoaderContext) {
  // Fetch the organization data
  const response = await fetch(`http://localhost:3000/api/organizations/${params.orgId}`, {
    headers: {
      cookie: request.headers.get('cookie'), // Pass the cookies along with the request
    },
  });

  const orgData = await response.json();
  return orgData;
}

const OrganizationDashboard: React.FC = () => {
  const orgData = useLoaderData();

  return (
    <OrganizationDashboardLayout orgData={orgData}>
      {/* Add your organization dashboard content here */}
      <h1>Welcome to {orgData.name} Dashboard</h1>
      <p>Organization dashboard content goes here.</p>
    </OrganizationDashboardLayout>
  );
};

export default OrganizationDashboard;
