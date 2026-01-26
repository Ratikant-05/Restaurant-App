import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4444/auth/profile", {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.msg || "Failed to load profile");
          return;
        }

        setProfile(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-green-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="min-h-[89vh] bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Profile
          </h1>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-3 border-green-500 overflow-hidden">
              <img
                src="/public/user.png"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <span className="text-gray-500 text-sm">Username</span>
              <span className="font-medium text-gray-800">username</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-4">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="font-medium text-gray-800">email@email.com</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-4">
              <span className="text-gray-500 text-sm">Contact</span>
              <span className="font-medium text-gray-800">contact</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-4">
              <span className="text-gray-500 text-sm">Address</span>
              <span className="font-medium text-gray-800">address</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export default Profile;
