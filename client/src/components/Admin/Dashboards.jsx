import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Post from "../../common/routes/post";




const Dashboards = () => {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [stats, setstats] = useState([]);

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

  useEffect(() => {
    getstats();
  }, []);

  return (
    <div>
      <div>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {stats.map((card, index) => (
            <Card sx={{ backgroundColor: "#E4B1D9" }} key={index}>
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardContent sx={{ height: "100%", textAlign: "center" }}>
                  <Typography variant="h5" component="div">
                    {card.nb}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <b>{card.on}</b>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboards;
