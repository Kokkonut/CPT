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
    <div className="bg-white rounded-lg p-4 w-1/2">
      <h2 className="text-2xl font-bold mb-4">Join Organization</h2>
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
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
              Join Organization
            </button>
          </div>
        </Form>
      )}
    </div>
    </DashboardLayout>
  );
};

export default JoinOrg;
