import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { Linkedin, DribbbleIcon as Behance } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/team.css';

const teamMembers = [
  {
    name: 'Heb Tounsi',
    role: 'Founder / CEO',
    link: 'https://www.facebook.com/ihebrayen.tounssy.14',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/iheb.jpg")
  },
  {
    name: 'Mahmoud Sassi',
    role: 'Co-founder / Digital Marketing Specialist',
    link: 'https://mahmoudsassi.digitalmoveup.tn/',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/mahmoud.jpeg")
  },
  {
    name: 'Ghassen Khedhry',
    role: 'Digital Manager',
    link: 'https://www.facebook.com/profile.php?id=100094531637741',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/ghass.png")
  },
  {
    name: 'Amen Allah Naamen',
    role: 'Front-end Developer',
    link: 'https://amennoomen.com/',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/me.jpeg")
  },
  {
    name: 'Hazem Saidani',
    role: 'MERN Developer',
    link: 'https://www.hazemsaidani.tn/',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/hazem.jpeg")
  },
  {
    name: 'Mohamed Lahbib Rahal',
    role: 'Graphic Designer',
    link: '',
    socialIcon: <Behance />,
    socialLink: '',
    image:require("../media/ra7al.png")
  },
  {
    name: 'Brinis Prod',
    role: 'Video Production',
    link: '',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/brenis.jpg")
  },
  {
    name: 'Olyzonu Prod',
    role: 'Video Production',
    link: '',
    socialIcon: <Linkedin />,
    socialLink: '',
    image:require("../media/olyzonu.jpg")
  },
];

const MeetOurTeam = () => {
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
                {member.image !== '' ? (<img src={member.image} alt={member.name} width="200px"  /> ):(<div className="image-placeholder"></div>) }
                
                  
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="member-links">
                {member.link && (
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="profile-link">
                    View Profile
                  </a>
                )}
                {member.socialLink && (
                  <a href={member.socialLink} target="_blank" rel="noopener noreferrer" className="social-icon">
                    {member.socialIcon}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MeetOurTeam;

