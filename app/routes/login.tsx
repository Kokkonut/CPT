import { Link } from "react-router-dom";
import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: { target: { name: any; value: any } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center flex-col ">
      <header className="text-6xl font-bold text-white fixed top-0">TaskMaster</header>
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6 text-center drop-shadow-lg">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="button-primary"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
