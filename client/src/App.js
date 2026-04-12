import React, { useState, useEffect, useCallback } from "react";
import LogInSignUp from "./LogInSignUp";
import "./App.css";
import GamePage from "./GamePage";

function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    const accountId = localStorage.getItem("_id");
    fetch("session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSession(true);
        }
      });
  }, []);

  const signUp = useCallback((usernameInput, passwordInput, emailInput) => {
    fetch("signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
      }),
    });
  }, []);

  const logIn = useCallback((usernameInput, passwordInput) => {
    fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSession(true);
          localStorage.setItem("_id", data.accountData._id);
        }
      });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("_id");
    setSession(false);
  }, []);

  let contentPage = <LogInSignUp signUp={signUp} logIn={logIn} />;
  if (session) {
    contentPage = <GamePage logOut={logOut} />;
  }
  return <div>{contentPage}</div>;
}

export default App;
