import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiBarChart2, FiLogOut, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-brand-light-dark/50 backdrop-blur-sm p-4 sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FiBarChart2 className="text-2xl text-brand-primary" />
          <span className="text-xl font-bold text-white">FinLit</span>
        </Link>
        <div className="flex items-center gap-4">
          {userInfo ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `font-semibold transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-white font-semibold rounded-lg text-sm"
              >
                <FiLogOut />
                Logout
              </motion.button>
            </>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg text-sm"
              >
                <FiLogIn />
                Sign In
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;