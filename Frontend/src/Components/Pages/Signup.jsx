import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4444/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.msg || "Signup failed");
        return;
      }
      navigate("/login");
      
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <img
        src="/bg-image.jpg"
        alt="bg"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12">

        <div className="text-white max-w-md space-y-6">
          <h1 className="text-3xl font-bold">
            Start your 30-day free trial
          </h1>

          <p className="text-gray-200">
            No credit card required. Cancel anytime.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                🔥
              </div>
              <div>
                <h2 className="font-semibold">Feature heading</h2>
                <p className="text-sm text-gray-300">
                  Short description of this feature.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-500 flex items-center justify-center">
                🚀
              </div>
              <div>
                <h2 className="font-semibold">Another feature</h2>
                <p className="text-sm text-gray-300">
                  Explain why users should sign up.
                </p>
              </div>
            </div>
          </div>

          <ul className="flex gap-4 text-sm text-gray-300 pt-4">
            <li className="hover:underline cursor-pointer">Terms</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Docs</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>

        <div className="w-full max-w-md bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete='off'
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-2 border  focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="tel"
              name="contact"
              placeholder="Contact"
              value={user.contact}
              onChange={handleChange}
              autoComplete='off'
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
              autoComplete='off'
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-green-400 outline-none"
            />

            {error && (
              <p className="text-sm text-green-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 font-medium hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? setTimeout(() => {
                "Signing up..."
              }, 3000) : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already a user?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 font-medium hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </section>
  );

};

export default Signup;
