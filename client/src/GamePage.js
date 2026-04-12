import React from "react";
import Leaderboard from "./Leaderboard";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: 0,
      rate: 0,
      cost: 0,
    };
    this.click = this.click.bind(this);
    this.upgrade = this.upgrade.bind(this);
  }
  componentDidMount() {
    let accountId = localStorage.getItem("_id");
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
        this.setState({
          cookies: data.cookies,
          cost: data.cost,
          rate: data.rate,
        });
      });
  }
  click() {
    let accountId = localStorage.getItem("_id");
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
        this.setState({
          cookies: data.cookies,
        });
      });
  }
  upgrade() {
    let accountId = localStorage.getItem("_id");
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
        this.setState({
          cookies: data.cookies,
          cost: data.cost,
          rate: data.rate,
        });
      });
  }

  render() {
    let navbarStyle = {
      width: "100%",
      height: "50px",
      display: "flex",
      justifyContent: "end",
      backgroundColor: "blue",
    };
    let gameStyle = {
      margin: "40px",
    };
    let pageStyle = {
      display: "flex",
      justifyContent: "space-around",
    };
    return (
      <div>
        <div style={navbarStyle}>
          <button onClick={this.props.logOut}>Log Out</button>
        </div>
        <div style={pageStyle}>
          <div style={gameStyle}>
            <img
              alt="Cookie"
              src={require("./assets/Cookie.jpeg")}
              onClick={this.click}
              className="cookie"
            />
            <p>Cookies:{this.state.cookies}</p>
            <p>Cookies per click: {this.state.rate}</p>
            <button onClick={this.upgrade}>
              Upgrade Cost:{this.state.cost} cookies
            </button>
          </div>
          <Leaderboard />
        </div>
      </div>
    );
  }
}

export default GamePage;
