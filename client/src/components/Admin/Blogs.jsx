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

const Blogs = () => {
  const fileInputRef = useRef(null);
  const [blogs, setblogs] = useState([]);
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [erralert, Seterralert] = useState(false);
  const [succalert, Setsuccalert] = useState(false);
  const [msj, Setmsj] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Post("/allblogs", {
        verif: true,
      });
      if (response.data.blogs) {
        setblogs(response.data.blogs);
      } else {
        console.log("No blogs available.");
        setblogs([]);
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
      title: "",
      description: "",
      tag: "",
    });
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDelete = async (blogId) => {
    try {
      const response = await Delete(`/deleteblog`, blogId);

      if (response.status === 200) {
        setblogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
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

    if (!formdata.title || !formdata.tag || !formdata.description) {
      Seterralert(true);
      Setmsj("Only image is not required");
      setTimeout(() => {
        Seterralert(false);
        Setmsj("");
      }, 1200);
      return;
    }
    try {
      const response = await Post("/addblog", {
        ...formdata,
        image: imageUrl,
      });
      
      if (response.status === 200 && response.data.msj) {
        setblogs((prevBlogs) => [
          ...prevBlogs,
          { ...formdata, image: imageUrl, _id: response.data.blog._id },
        ]);

        cleatForm();
        Setsuccalert(true);
        Setmsj(response.data.msj);

        setTimeout(() => {
          Setsuccalert(false);
          Setmsj("");
        }, 1200);
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
            Blogs
          </Typography>
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Title"
            name="title"
            variant="standard"
            color="secondary"
            value={formdata.title}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Tag"
            name="tag"
            variant="standard"
            color="secondary"
            value={formdata.tag}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ width: "80%", mt: "20px" }}
            label="Description"
            name="description"
            variant="standard"
            color="secondary"
            multiline
            maxRows={4}
            value={formdata.description}
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
        {blogs.map((blog) => (
          <Card
            key={blog._id}
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
              image={blog.image}
              alt={blog.title}
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
                  {blog.title}
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
                  {blog.tag}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                  }}
                >
                  {blog.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                  }}
                >
                  Created At {new Date(blog.createdAt).toLocaleString()}
                </Typography>
              </CardContent>

              <Button
                size="small"
                color="error"
                onClick={() => {
                  handleDelete(blog._id);
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

export default Blogs;
