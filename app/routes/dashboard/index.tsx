import React, { useEffect, useState } from "react";
import DashboardLayout from "~/components/Dashboardlayout";
import CreateOrg from "./CreateOrg";
import JoinOrg from "./JoinOrg";

const Dashboard: React.FC = () => {
  // State variable to store user data
  const [userData, setUserData] = useState<any>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user/data", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Conditionally render the components based on the user's organizations
  return (
    <DashboardLayout>
      {userData && userData.organizations.length === 0 ? (
        <>
          <CreateOrg />
          <JoinOrg />
        </>
      ) : (
        <div>Your organizations will be shown here</div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
