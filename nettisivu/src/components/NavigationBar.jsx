import React from "react";
import "../styles/NavigationBar.css";

const NavigationBar = ({ balance, onLogout }) => {
  return (
    <div className="navigation-bar">
      <div className="balance">Saldo: {balance}€</div>
      <button className="logout-button" onClick={onLogout}>
        Kirjaudu ulos
      </button>
    </div>
  );
};

export default NavigationBar;