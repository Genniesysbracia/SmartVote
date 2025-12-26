import React from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({
  title,
  subtitle,
  submitText,
  onSubmit,
  children,
  loading = false,
  error,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {children}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {loading ? 'Processing...' : submitText}
          </button>
        </div>
      </form>

      {footerText && (
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">{footerText} </span>
          <Link
            to={footerLinkTo}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {footerLinkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
