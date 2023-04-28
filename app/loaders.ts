export async function fetchUserData() {
    try {
      const response = await fetch("api/user/data", {
        method: "GET",
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('data from loaders', data)
        return data;
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  