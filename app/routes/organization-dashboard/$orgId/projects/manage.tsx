import { useLoaderData } from "@remix-run/react";
import DashboardLayout from "~/layouts/Dashboardlayout";
import Breadcrumb from "~/components/Breadcrumb";
import OrgProjects from "~/components/tables/OrgProjects";

interface LoaderContext {
    request: Request;
    params: { orgId: string };
}
//get projects for org
export async function loader({ request, params }: LoaderContext) {
  const response = await fetch(
    `http://localhost:3000/api/project/${params.orgId}`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '', 
      },
    }
  );
  console.log('RESPONSE FROM MANAGE PROJECTS LOADER', response);
  const data = await response.json();
  console.log('DATA FROM MANAGE PROJECTS LOADER', data);
  return data;
}

function ManageProjects() {
  const data = useLoaderData();
  console.log('DATA FROM MANAGE PROJECTS', data);

  return (
    <DashboardLayout>
      <Breadcrumb pageName="Manage Projects" />
      {/* <OrgProjects projects={data.projects} /> */}
    </DashboardLayout>
  )
}

export default ManageProjects;
