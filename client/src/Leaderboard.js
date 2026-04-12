import React, { useState, useEffect, useCallback } from "react";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const updateLeaderboard = useCallback(() => {
    fetch("getLeaderboard")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data.topAccounts);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateLeaderboard, 1000);
    return () => clearInterval(interval);
  }, [updateLeaderboard]);

  const display = users.map((item) => {
    return (
      <li key={item._id}>
        {item.username}: {item.upgrades + 1}
      </li>
    );
  });
  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>{display}</ol>
    </div>
  );
}

export default Leaderboard;
