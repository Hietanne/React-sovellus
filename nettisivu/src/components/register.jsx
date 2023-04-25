import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css"

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    balance: 0,
  });

  const [errorMessage, setErrorMessage] = useState(""); // Lisää tämä rivi

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users", formData);
      console.log(response.data);
      alert("User registered successfully!");
      setErrorMessage(""); // Tyhjennä virheilmoitus onnistuneen rekisteröinnin jälkeen
      props.onRegisterSuccess();
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.data.message === "User already exists") {
        setErrorMessage("User already exists"); // Aseta virheilmoitus tilaan
      } else {
        setErrorMessage("Error registering user");
      }
    }
  };


  return (
    <div className="auth-container">
      <div>
        <h1>Register</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Näytä virheilmoitus */}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;