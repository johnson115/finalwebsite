import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Failed from "../../common/components/failed";
import Success from "../../common/components/success";
import Post from "../../common/routes/post";
import Delete from "../../common/routes/delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Team = () => {
  const fileInputRef = useRef(null);
  const [team, setteam] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    profile: "",
    post: "",
  });
  const [erralert, Seterralert] = useState(false);
  const [succalert, Setsuccalert] = useState(false);
  const [msj, Setmsj] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Post("/allteam", {
        verif: true,
      });
      if (response.data.teams) {
        setteam(response.data.teams);
      } else {
        console.log("No Members available.");
        setteam([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const cleatForm = () => {
    setFormdata({
      name: "",
      profile: "",
      post: "",
    });
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDelete = async (Id) => {
    try {
      const response = await Delete(`/deleteteam`, Id);

      if (response.status === 200) {
        setteam((prev) => prev.filter((blog) => blog._id !== Id));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "Digital_prest");
    formData.append("folder", "digital");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dt9th2zfa/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary error:", error.response?.data || error.message);
      alert(
        "Image upload failed: " +
          (error.response?.data?.error?.message || error.message)
      );
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageToCloudinary();

    if (!formdata.name || !formdata.post) {
      Seterralert(true);
      Setmsj("Name and post are required");
      setTimeout(() => {
        Seterralert(false);
        Setmsj("");
      }, 1200);
      return;
    }
    try {
      const response = await Post("/addteam", {
        ...formdata,
        image: imageUrl,
      });

      if (response.status === 200 && response.data.msj) {
        setteam((prevBlogs) => [
          ...prevBlogs,
          { ...formdata, image: imageUrl, _id: response.data.team._id },
        ]);

        cleatForm();
        Setsuccalert(true);
        Setmsj(response.data.msj);

        setTimeout(() => {
          Setsuccalert(false);
          Setmsj("");
        }, 1200);
        return
      }
    } catch (error) {
      cleatForm();
      Seterralert(true);
      Setmsj(
        error.response?.data?.message ||
          error.message ||
          "error occured try again later"
      );

      setTimeout(() => {
        Seterralert(false);
        Setmsj("");
      }, 1200);
    }
  };

  return (
    <div>
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
            Team Members
          </Typography>
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Full name"
            name="name"
            variant="standard"
            color="secondary"
            value={formdata.name}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Post"
            name="post"
            variant="standard"
            color="secondary"
            value={formdata.post}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Profile Link"
            name="profile"
            variant="standard"
            color="secondary"
            multiline
            maxRows={4}
            value={formdata.profile}
            onChange={handleInputChange}
          />
          <input
            type="file"
            style={{ marginTop: "20px" }}
            onChange={handleImageChange}
            ref={fileInputRef}
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

      <Box
        sx={{
          display: "grid",
          gap: 2,
          padding: 2,
          gridTemplateColumns: "repeat(1, 1fr)",
          placeItems: "center",
          marginTop: "20px",
        }}
      >
        {team.map((teams) => (
          <Card
            key={teams._id}
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 800,
              height: 200,
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 200,
                height: "100%",
                objectFit: "cover",
              }}
              image={teams.image}
              alt={teams.name}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 1, fontSize: "1.1rem" }}
                >
                  {teams.name}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    display: "inline-block",
                    bgcolor: "#e0e0e0",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.8rem",
                  }}
                >
                  {teams.post}
                </Typography>

                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                  }}
                >
                  Created At {new Date(teams.createdAt).toLocaleString()}
                </Typography>
                <br />
                {teams.profile === "none" ? <></> : <a
                  href={teams.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btnprofile">Profile</button>
                </a>}
                
              </CardContent>

              <Button
                size="small"
                color="error"
                onClick={() => {
                  handleDelete(teams._id);
                }}
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  minWidth: "auto",
                }}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Team;