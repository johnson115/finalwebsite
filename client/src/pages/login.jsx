import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./login.css"
import logo from "../media/Logo DG move up_Plan de travail 1 copie 11.png"

const Login = () => {
    return (
        <div className="background">
      <div className="form">
        <img src={logo} alt="Digital Move Up" />
        <form>
          <TextField
            sx={{ width: "100%", mb: 3.5 }}
            id="email"
            name="username"
            placeholder="User Name"
            variant="standard"
            type="text"
          />
          <TextField
            sx={{ width: "100%", mb: 3.5 }}
            id="pass"
            name="password"
            placeholder="Password"
            variant="standard"
            type="password"
           
          />
          <br />
          
          <br />
          <div className="btns">
            <Button variant="outlined">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Login;