// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;