import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Post from "../../common/routes/post";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboards = () => {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [stats, setstats] = useState([]);
  const [views, setviews] = useState([]);
  const [bce, setbce] = useState(0);
  const [ServiceClick, setServiceClick] = useState([]);
  const [ContactClick, setContactClick] = useState([]);
  const [ProjectClick, setProjectClick] = useState([]);
  const [TeamClick, setTeamClick] = useState([]);
  const [GetStartedClick, setGetStartedClick] = useState([]);
  const [AboutClick, setAboutClick] = useState([]);

  const getstats = async () => {
    try {
      const response = await Post("/getstats", {
        verif: true,
      });
      if (response.data) {
        setstats(response.data);
      } else {
        console.log("No Stats available.");
        setstats([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getviews = async (on) => {
    try {
      const response = await Post("/views", { on: on });
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const benefits = async () => {
    try {
      const response = await Post("/benefits", {
        verif: true,
      });
      if (response.data.total) {
        setbce(response.data.total);
      } else {
        setbce(0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getstats();
      setviews(await getviews("Main Page View"));
      setServiceClick(await getviews("Service Click"));
      setGetStartedClick(await getviews("Get Started Click"));
      setAboutClick(await getviews("About Click"));
      setTeamClick(await getviews("Team Profile Click"));
      setContactClick(await getviews("Contact Click"));
      setProjectClick(await getviews("Project Click"));
      benefits();
    };
    fetchData();
  }, []);

  const renderChart = (data, title, color) => (
    <Grid item xs={12}>
      <Card elevation={3} sx={{ textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <Line
                type="monotone"
                dataKey="sum"
                stroke={color}
                strokeWidth={2}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={3}>
          {stats.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#6FE0CE",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div">
                      {card.nb}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <b>{card.on}</b>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            
          ))}
           <Grid item xs={12} sm={6} md={4} lg={3} key={bce}>
              <Card
                sx={{
                  backgroundColor: "#DDFADD",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(bce)}
                  data-active={selectedCard === bce ? "" : undefined}
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div">
                      {bce} $
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <b>Card Benefits</b>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 6 }}>
        <Grid container spacing={4}>
          {renderChart(views, "Main Page Views *2", "#0DA9A3")}
          {renderChart(ContactClick, "Contact us Click", "#9C27B0")}
          {renderChart(ServiceClick, "Service Click", "#0DA9A3")}
          {renderChart(GetStartedClick, "Get Started Click", "#9C27B0")}
          {renderChart(ProjectClick, "Project Click", "#0DA9A3")}
          {renderChart(AboutClick, "About us Click", "#9C27B0")}
          {renderChart(TeamClick, "Team Profile Click", "#0DA9A3")}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboards;
