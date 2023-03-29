import { useEffect } from "react";
import { useLocation } from "@remix-run/react";

function Splash() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      document.body.classList.add("bg-blue-500");
    } else {
      document.body.classList.remove("bg-gray-500");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <h1 className="text-6xl font-bold text-white drop-shadow">TaskMaster</h1>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 m-4">
        Login or Create Account
      </button>
    </div>
  );
}

export default Splash;
