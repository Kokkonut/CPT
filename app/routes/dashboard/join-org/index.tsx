import React, { useState, useEffect } from 'react';
import { Form } from '@remix-run/react';
import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';


function JoinOrg() {
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    setShowForm(true);
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const response = await fetch('/api/org/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orgName: event.currentTarget.orgName.value }),
    });

    if (response.ok) {
      // Redirect or show a success message
      console.log('Successfully joined organization');
    } else {
      // Show an error message
      console.error('Failed to join organization');
    }
  }

  return (
    <DashboardLayout>
      <Breadcrumb pageName="Join Organization" />

      <div className="rounded-sm border py-4 px-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {showForm && (
          <Form method="post" onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label htmlFor="orgId" className="mb-3 block text-black dark:text-white">
              Search for an organization
            </label>
            <input
              id="orgName"
              name="orgName"
              type="text"
              placeholder="Search"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10
            >
              Join Organization
            </button>
        </div>
        </div>
        </Form>
        )}
      </div>


      {/* <div className="bg-white rounded-lg p-4 w-1/2">
        {showForm && (
          <Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="orgId" className="font-medium">
                Organization Name:
              </label>
              <input
                id="orgName"
                name="orgName"
                type="text"
                required
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10
              >
                Join Organization
              </button>
            </div>
          </Form>
        )}
      </div> */}




    </DashboardLayout>
  );
};

export default JoinOrg;
