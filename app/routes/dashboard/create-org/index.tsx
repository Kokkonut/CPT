import { Fragment, useState } from "react";

interface CreateOrgModalProps {
  closeModal: () => void;
}

function CreateOrg({ closeModal }: CreateOrgModalProps) {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/org/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect or show a success message
        console.log('Organization created successfully');
        closeModal();
      } else {
        // Show an error message
        console.error('Failed to create organization');
      }
    } catch (error) {
      console.error('Failed to create organization', error);
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Fragment>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-4 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Create Organization</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium">
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
              >
                Create Organization
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default CreateOrg;
