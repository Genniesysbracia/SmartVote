// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/Signup.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    date_of_birth: ''
  });
  const [agreed, setAgreed] = useState(false);
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
      // Format the data to match backend expectations
      const userData = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        date_of_birth: formData.date_of_birth
      };

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await api.users.createUser(userData);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formSection}>
        <h1 className={styles.title}>REGISTER</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameRow}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength="6"
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              minLength="6"
              className={styles.input}
            />
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className={styles.checkbox}
              required
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I confirm that the information provided is accurate and complete.
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !agreed} 
            className={styles.submitButton}
          >
            {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
          </button>
          
          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <div className={styles.imageSection}>
        {/* This will be the right side with the image */}
      </div>
    </div>
  );
}