import React, { useEffect, useState } from "react";
import AvailableUsers from "~/components/tables/AvailableUsers";
import AssignedUsers from "~/components/tables/AssignedUsers";
import { useParams } from "@remix-run/react";

import DashboardLayout from "~/layouts/Dashboardlayout";

const ProjectUserManagement = () => {


  const { orgId, projectId } = useParams();
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // Fetch available users
    const fetchAvailableUsers = async () => {
      const res = await fetch(
        `/api/project/${orgId}/${projectId}/availableUsers`
      );
      const data = await res.json();
      console.log("DATA FROM AVAILABLE USERS", data);
      setAvailableUsers(data);
      setloading(false);
    };

    // Fetch assigned users
    // const fetchAssignedUsers = async () => {
    //   const res = await fetch(`/api/org/${orgId}/project/${projectId}/users`);
    //   const data = await res.json();
    //   setAssignedUsers(data);
    // };

    fetchAvailableUsers();
    // fetchAssignedUsers();
  }, [orgId, projectId]);

    if (loading) {
        return (<div>LOADING</div>)
    }

  const assignToProject = async (userId) => {
    // Add user to project
    const res = await fetch(
      `/api/org/${orgId}/project/${projectId}/user/${userId}`,
      {
        method: "POST",
      }
    );
    if (res.ok) {
      // Refresh users
      setAvailableUsers(availableUsers.filter((user) => user._id !== userId));
      const user = availableUsers.find((user) => user._id === userId);
      setAssignedUsers([...assignedUsers, user]);
    }
  };

  const removeFromProject = async (userId) => {
    // Remove user from project
    const res = await fetch(
      `/api/org/${orgId}/project/${projectId}/user/${userId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      // Refresh users
      setAssignedUsers(assignedUsers.filter((user) => user._id !== userId));
      const user = assignedUsers.find((user) => user._id === userId);
      setAvailableUsers([...availableUsers, user]);
    }
  };
  console.log("AVAILABLE USERSXxXxXxXX", availableUsers);
  return (
    <DashboardLayout>
      <div>
        <AvailableUsers
          users={availableUsers}
          assignToProject={assignToProject}
        />
        {/* <AssignedUsers users={assignedUsers} removeFromProject={removeFromProject} /> */}
      </div>
    </DashboardLayout>
  );
};

export default ProjectUserManagement;
