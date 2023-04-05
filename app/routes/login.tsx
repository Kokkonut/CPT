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
    console.log("form data", formData);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
        //TODO: Set cookie
        //REMOVED WHILE TESTING HTTP ONLY COOKIE
        // const { token } = await res.json();
        // localStorage.setItem('token', token)
        // console.log(res.headers.get('Set-Cookie'))
        // document.cookie = res.headers.get('Set-Cookie') as string;
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6 text-center">Login</h1>
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
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
