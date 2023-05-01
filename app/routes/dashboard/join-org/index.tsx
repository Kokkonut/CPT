import React, { useState, useEffect } from 'react';
import { Form } from '@remix-run/react';

interface JoinOrgProps {
  visible?: boolean;
  closeModal: () => void;
}

const JoinOrg: React.FC<JoinOrgProps> = ({ visible = false, closeModal }) => {
  const [showForm, setShowForm] = useState(visible);

  useEffect(() => {
    setShowForm(visible);
  }, [visible]);

  async function handleSubmit(event: any) {
    const response = await fetch('/api/organizations/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.formData,
    });

    if (response.ok) {
      // Redirect or show a success message
    } else {
      // Show an error message
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-500 hover:text-blue-700"
        >
          Join Organization
        </button>
      </h1>
      {showForm && (
        <div className="space-y-4">
          <Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="orgId" className="font-medium">
                Organization ID:
              </label>
              <input
                id="orgId"
                name="orgId"
                type="text"
                required
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
              Join Organization
            </button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default JoinOrg;
