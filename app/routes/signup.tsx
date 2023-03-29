import { Link } from "@remix-run/react";
import "tailwindcss/tailwind.css";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl mb-6 text-center">Signup</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
          Signup
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
