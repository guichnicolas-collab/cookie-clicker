import React from "react";
import LogInSignUp from "./LogInSignUp";
import "./App.css";
import GamePage from "./GamePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false,
    };
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    let accountId = localStorage.getItem("_id");
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
          this.setState({ session: true });
        }
      });
  }
  signUp(usernameInput, passwordInput, emailInput) {
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
  }
  logIn(usernameInput, passwordInput) {
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
          this.setState({ session: true });
          localStorage.setItem("_id", data.accountData._id);
        }
      });
  }
  logOut() {
    localStorage.removeItem("_id");
    this.setState({ session: false });
  }
  render() {
    let contentPage = <LogInSignUp signUp={this.signUp} logIn={this.logIn} />;
    if (this.state.session) {
      contentPage = <GamePage logOut={this.logOut} />;
    }
    return <div>{contentPage}</div>;
  }
}

export default App;
