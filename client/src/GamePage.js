import React, { useState, useEffect, useCallback } from "react";
import Leaderboard from "./Leaderboard";

function GamePage({ logOut }) {
  const [cookies, setCookies] = useState(0);
  const [rate, setRate] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const accountId = localStorage.getItem("_id");
    fetch("getCookies", {
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
        setCookies(data.cookies);
        setCost(data.cost);
        setRate(data.rate);
      });
  }, []);

  const click = useCallback(() => {
    const accountId = localStorage.getItem("_id");
    fetch("click", {
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
        setCookies(data.cookies);
      });
  }, []);

  const upgrade = useCallback(() => {
    const accountId = localStorage.getItem("_id");
    fetch("buyUpgrade", {
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
        setCookies(data.cookies);
        setCost(data.cost);
        setRate(data.rate);
      });
  }, []);

  const navbarStyle = {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "end",
    backgroundColor: "blue",
  };
  const gameStyle = {
    margin: "40px",
  };
  const pageStyle = {
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <div>
      <div style={navbarStyle}>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div style={pageStyle}>
        <div style={gameStyle}>
          <img
            alt="Cookie"
            src={require("./assets/Cookie.jpeg")}
            onClick={click}
            className="cookie"
          />
          <p>Cookies:{cookies}</p>
          <p>Cookies per click: {rate}</p>
          <button onClick={upgrade}>
            Upgrade Cost:{cost} cookies
          </button>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

export default GamePage;
