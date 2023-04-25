import "./styles.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import NavigationBar from "./components/NavigationBar.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0); // Lisää tila käyttäjän saldolle

  const handleLoginSuccess = (userBalance) => {
    setIsLoggedIn(true);
    setBalance(userBalance);
  };

  const handleRegisterSuccess = (userBalance) => {
    setIsLoggedIn(true);
    setBalance(userBalance);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setBalance(0);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <NavigationBar balance={balance} onLogout={handleLogout} />
          <h1>Tervetuloa pääsivulle!</h1>
          {/* Täällä voi olla muuta sisältöä, joka näytetään kirjautuneille käyttäjille */}
        </div>
      ) : (
        <div>
          <h1>Tervetuloa React-sovellukseen!</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Register onRegisterSuccess={handleRegisterSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));