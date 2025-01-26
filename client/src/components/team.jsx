import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/team.css";
import Click from "../common/routes/click";
import Post from "../common/routes/post";

const MeetOurTeam = React.forwardRef((props, ref) => {
  const [teamMembers, setteam] = useState([]);

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

  const add = async (type, on) => {
    try {
      await Click("/add", {
        type: type,
        on: on,
        nb: 1,
      });

      console.log("Click added successfully.");
    } catch (error) {
      console.error("Error adding visit:", error.message);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="meet-our-team">
      <div className="waving-hands"></div>
      <div className="waving-bg"></div>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-member"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="member-image">
                {member.image !== "" ? (
                  <img src={member.image} alt={member.name} width="200px" />
                ) : (
                  <div className="image-placeholder"></div>
                )}
              </div>
              <h3>{member.name}</h3>
              <p>{member.post}</p>
              <div className="member-links">
                {member.profile && (
                  <a
                    href={member.profile}
                    onClick={() => {
                      add("Click", "Team Profile Click");
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                  >
                    View Profile
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
});

export default MeetOurTeam;
