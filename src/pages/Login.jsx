import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would verify the email here
      // For now, we'll just redirect to home
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Welcome Back</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Logging in...' : 'Continue with Email'}
        </button>
      </form>
      <p className={styles.signupLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}