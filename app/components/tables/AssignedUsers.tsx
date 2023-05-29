import React from "react";

interface AssignedUsersProps {
    users: any;
    removeFromProject: (arg: string) => void;
}

const AssignedUsers = ({ users, removeFromProject }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Assigned Users
      </h4>
      {users.map((user) => (
        <div key={user._id}>
          <div>{user.name}</div>
          <div>{user.capacity}</div>
          <button onClick={() => removeFromProject(user._id)}>Remove from project</button>
        </div>
      ))}
    </div>
  );
};

export default AssignedUsers;
