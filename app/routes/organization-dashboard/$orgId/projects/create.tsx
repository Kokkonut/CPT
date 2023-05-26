import React, { useState, useEffect } from 'react';
import { Form, useLocation } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

function CreateProject() {
    const [projectName, setProjectName] = useState("");
    const location = useLocation();
    const { pathname } = location;
    const  organizationId  = pathname.split("/")[2];
    console.log('ORGID', organizationId);
    
    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        
        const response = await fetch(`/api/project/${organizationId}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName }),
        });
    
        if (response.ok) {
        // Redirect or show a success message
        console.log('Successfully sent invite');
        } else {
        // Show an error message
        console.error('Failed to send invite');
        }
    }
    
    return (
        <DashboardLayout>
        <Breadcrumb pageName="Create Project" />
        
        <div className="rounded-sm border py-4 px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                <label htmlFor="projectName" className="mb-3 block text-black dark:text-white">
                    Enter Project Name
                </label>
                <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={e => setProjectName(e.target.value)}
                />
                </div>
                <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Create Project
                </button>
                </div>
            </div>
            </Form>
        </div>
        </DashboardLayout>
    );
}