import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css"

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Muokkaa tätä osoitetta vastaamaan API:n kirjautumisreittiä
      const response = await axios.post("http://localhost:3001/login", formData);
      console.log(response.data);
      alert("User logged in successfully!");
      setErrorMessage("");
      props.onLoginSuccess();
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error logging in. Please check your email and password.");
    }
  };

  return (
    <div className="auth-container">
      <div>
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;