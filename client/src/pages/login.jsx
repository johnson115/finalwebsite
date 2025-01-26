import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./login.css";
import logo from "../media/Logo DG move up_Plan de travail 1 copie 11.png";
import Post from "../common/routes/post";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Success from "../common/components/success";
import Failed from "../common/components/failed";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errmsj, Seterrmsj] = useState(false);
  const [succmsj, Setsuccmsj] = useState(false);
  const [txt, Settxt] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };





  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await Post("/login", formData);
      if (resp.status === 200 && resp.data.msj) {
        Cookies.set("token", resp.data.token, { expires: 1 });
        setFormData({ username: "", password: "" });
        Setsuccmsj(true);
        Seterrmsj(false);
        Settxt(resp.data.msj);
        setTimeout(() => {
          Setsuccmsj(false);
          Settxt("");
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }, 2000);
      } else {
        setFormData({ username: "", password: "" });
        Setsuccmsj(false);
        Settxt(resp.data.err);
        Seterrmsj(true);
        setTimeout(() => {
          Seterrmsj(false);
          Settxt("");
        }, 2000);
      }
    } catch (error) {
      setFormData({ username: "", password: "" });
      Setsuccmsj(false);
      Settxt("Something went wrong. Please try again.");
      Seterrmsj(true);
      setTimeout(() => {
        Seterrmsj(false);
        Settxt("");
      }, 2000);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="background">
      <div className="form">
        <img src={logo} alt="Digital Move Up" />
        <form onSubmit={HandleSubmit}>
          <TextField
            sx={{ width: "100%", mb: 3.5 }}
            id="email"
            name="username"
            placeholder="User Name or email"
            variant="standard"
            type="text"
            color="secondary"
            value={formData.username}
            onChange={change}
          />
          <TextField
            sx={{ width: "100%", mb: 3.5 }}
            id="pass"
            name="password"
            placeholder="Password"
            variant="standard"
            type="password"
            color="secondary"
            value={formData.password}
            onChange={change}
          />
          <br />
          {succmsj && <Success msj={txt} />}
          {errmsj && <Failed msj={txt} />}
          <br />

          <div className="btns">
            <Button variant="outlined" color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;