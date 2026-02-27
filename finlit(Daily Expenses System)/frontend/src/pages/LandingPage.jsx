import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBarChart2, FiLogIn, FiUserPlus } from 'react-icons/fi';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const LandingPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-brand-dark bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 w-64 h-64 bg-brand-primary rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 -z-10 w-64 h-64 bg-brand-secondary rounded-full filter blur-3xl opacity-20 animate-pulse delay-2000"></div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <FiBarChart2 className="text-7xl mb-4 text-brand-primary" />
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary animate-gradient-x">
        FinLit
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Track your spending like a true Gen Z. Effortless, stylish, and always on point.
        Stop guessing, start knowing where your money goes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-48 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            <FiLogIn />
            <span>Sign In</span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 w-48 px-6 py-3 bg-brand-light-dark text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 border border-brand-primary"
          >
            <FiUserPlus />
            <span>Sign Up</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;