import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogout = () => {
    logout()
      .then(() => {
        alert("Logged out successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="h-screen bg-teal-100 flex flex-col items-center justify-center space-y-6 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Are you sure you want to logout?
      </h1>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
