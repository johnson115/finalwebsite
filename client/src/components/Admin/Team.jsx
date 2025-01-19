import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Post from "../../common/routes/post";
const Team = () => {

  const [formdata, Setformdata] = useState({
    title: "",
    description: "",
    tag: "",
    image: "",
  });
                          
  const onchange = (e) => {
    const { name, value } = e.target;
    Setformdata({ ...formdata, [name]: value });
  };

  const onsubmit = async () => {
    try {
      const res = await Post("/", formdata);
      alert(res.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={onsubmit}>
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
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          id="standard-multiline-flexible"
          label="Title"
          multiline
          name="title"
          maxRows={4}
          variant="standard"
          color="secondary"
          value={formdata.title}
          onChange={onchange}
        />
        <br />
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          id="standard-multiline-flexible"
          label="Tag"
          multiline
          maxRows={4}
          name="tag"
          variant="standard"
          color="secondary"
          value={formdata.tag}
          onChange={onchange}
        />
        <br />
        <TextField
          sx={{ width: "80%", mt: "20px" }}
          id="standard-multiline-flexible"
          label="Description"
          name="description"
          multiline
          maxRows={4}
          variant="standard"
          color="secondary"
          value={formdata.description}
          onChange={onchange}
        />
        <br />
        <input
        name="image"
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          style={{ marginTop: "20px" }}
          value={formdata.image}
          onChange={onchange}
        />
      </Box>
      <div style={{ float: "right", marginTop: "35px" }}>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginRight: "20px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginRight: "20px" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default Team;
