import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Failed from "../../common/components/failed";
import Success from "../../common/components/success";
import Post from "../../common/routes/post";
import Typography from "@mui/material/Typography";

const Changepassword = () => {
  const [formdata, setFormdata] = useState({
    actual: "",
    neww: "",
    confirm: "",
  });
  const [erralert, Seterralert] = useState(false);
  const [succalert, Setsuccalert] = useState(false);
  const [msj, Setmsj] = useState("");

  const cleatForm = () => {
    setFormdata({
      actual: "",
      neww: "",
      confirm: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formdata.actual || !formdata.neww || !formdata.confirm) {
      showAlert("All fields are required", true);
      return;
    }
    if (formdata.neww !== formdata.confirm) {
      showAlert("Passwords do not match", true);
      cleatForm();
      return;
    }
  
    try {
      const response = await Post("/change", { actual: formdata.actual, neww: formdata.neww });
  
      if (response.status === 200 && response.data.msj) {
        showAlert(response.data.msj, false);
        cleatForm();
      } else {
        showAlert(response.data.err || "An error occurred", true);
        cleatForm();
      }
    } catch (error) {
      showAlert("An error occurred, please try again later", true);
      cleatForm();
    }
  };
  
  const showAlert = (message, isError) => {
    if (isError) {
      Seterralert(true);
    } else {
      Setsuccalert(true);
    }
    Setmsj(message);
  
    setTimeout(() => {
      Seterralert(false);
      Setsuccalert(false);
      Setmsj("");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mt: "20px",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ mb: 1, fontSize: "2rem" }}
        >
          Change Password
        </Typography>
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          label="Actual password"
          name="actual"
          type="password"
          variant="standard"
          color="secondary"
          value={formdata.actual}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          label="New Password"
          name="neww"
          variant="standard"
          type="password"
          color="secondary"
          value={formdata.neww}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          label="Confirm new password"
          name="confirm"
          variant="standard"
          type="password"
          color="secondary"
          value={formdata.confirm}
          onChange={handleInputChange}
        />
      </Box>

      <br />
      {erralert && <Failed msj={msj} />}
      {succalert && <Success msj={msj} />}
      <br />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "35px" }}>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginRight: "20px" }}
          onClick={cleatForm}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default Changepassword;
