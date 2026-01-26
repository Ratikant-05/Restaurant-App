import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target

    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");
    setSuccess("");
    try {
      const response = await fetch(`http://localhost:4444/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(user),
        credentials: "include"
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        setServerError(data.msg || "Login failed");
        return;
      }
      setSuccess("Login Successful")
      setIsAuthenticated(true)
      navigate('/home')

    } catch (error) {
      console.log("Login >> ", error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6">
      <img
        src="/public/bg-image.jpg"
        alt="bg"
        className="fixed w-100% h-100% object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      <div className="w-full max-w-md bg-white shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              autoComplete='off'
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              autoComplete='off'
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {serverError && (
            <p className="text-sm text-green-500 text-center">{serverError}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 font-medium hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );

}

export default Login
