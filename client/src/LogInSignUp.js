import React, { useState } from "react"

function LogInSignUp({ signUp, logIn }) {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [emailInput, setEmailInput] = useState("")

    const formStyle = {

    }
    const inputStyle = {
        margin: "10px",
        padding: "7px",
        width: "190px"
    }
    const noteStyle = {
        fontSize: "12px"
    }
    const submitStyle = {
        padding: "10px",
        backgroundColor: "#3bdb9e",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
    return (
        <div>
            <h4>Please fill out the form below to create an account.</h4>
            <hr/>
            <form style={formStyle}>
                <input style={inputStyle} type="text" placeholder="Username" value={usernameInput} onChange={(e) => {setUsernameInput(e.target.value)}} required/>
                <br/>
                <input style={inputStyle} type="password" placeholder="Password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} required/>
                <br/>
                <input style={inputStyle} type="email" placeholder="Email" value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}} required/>
                <br/>
                <p style={noteStyle}>By signing up, you have read and agreed to our <a href="#">Terms and Privacy</a>.</p>
                <input style={submitStyle} type="submit" value="Sign Up" onClick={() => {signUp(usernameInput, passwordInput, emailInput)}}/>
            </form>
            <hr/>
            <h4>Already have an account? Log In</h4>
            <hr/>
            <div style={formStyle}>
                <input style={inputStyle} type="text" placeholder="Username" value={usernameInput} onChange={(e) => {setUsernameInput(e.target.value)}} required/>
                <br/>
                <input style={inputStyle} type="password" placeholder="Password" value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} required/>
                <br/>
                <input style={submitStyle} type="submit" value="Log In" onClick={() => {logIn(usernameInput, passwordInput)}}/>
            </div>
        </div>
    )
}

export default LogInSignUp