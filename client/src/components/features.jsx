import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lightbulb, Rocket, Zap, Users, TrendingUp, Globe } from "lucide-react";
import "../styles/features.css";
import Click from "../common/routes/click";

const features = [
  {
    icon: <Lightbulb />,
<<<<<<< HEAD
    title: 'Innovative Solutions',
    description: 'Our forward-thinking digital strategies empower your brand to rise above the competition, delivering fresh ideas that drive lasting results.'
  },
  {
    icon: <Rocket />,
    title: 'Proven Expertise',
    description: 'With over 2 years of experience, we’ve mastered the art of crafting tailored solutions that help businesses achieve remarkable growth.'
  },
  {
    icon: <Zap />,
    title: 'Fast Turnaround',
    description: 'Our streamlined workflows and efficient processes ensure your projects are delivered on time, without ever compromising on quality'
  },
  {
    icon: <Users />,
    title: 'Client-Centric Approach',
    description: 'Your goals are at the heart of our customized strategies. We listen, adapt, and execute with precision to exceed your expectations'
  },
  {
    icon: <TrendingUp />,
    title: 'Measurable Results',
    description: 'Every action we take is rooted in driving tangible outcomes, ensuring your investment delivers maximum returns in a data-driven landscape.'
  },
  {
    icon: <Globe />,
    title: 'Enduring Partnerships',
    description: 'More than just a service provider, we’re your trusted partner in long-term digital success, walking with you every step of the way'
  }
=======
    title: "Innovative Solutions",
    description:
      "We bring fresh ideas to the table, helping you stand out in the competitive digital space.",
  },
  {
    icon: <Rocket />,
    title: "Proven Expertise",
    description:
      "With over 2 years of experience, we've helped businesses thrive through tailored strategies.",
  },
  {
    icon: <Zap />,
    title: "Fast Turnaround",
    description:
      "Our efficient workflows ensure your project is completed on time, every time.",
  },
  {
    icon: <Users />,
    title: "Client-Centric Focus",
    description:
      "We value collaboration and keep you informed at every step of the process.",
  },
  {
    icon: <TrendingUp />,
    title: "Results You Can Measure",
    description:
      "We prioritize ROI, delivering measurable outcomes that drive your success.",
  },
  {
    icon: <Globe />,
    title: "Global Reach",
    description:
      "Our solutions connect you with audiences worldwide, expanding your business opportunities.",
  },
>>>>>>> e2edfb0e56c42c7d2f69284ecc46eadb58cfa8e4
];

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-circle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="icon-wrapper"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const Features = React.forwardRef((props , ref)  => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
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
  return (
    <section className="features-section">
      <AnimatedBackground />
      <motion.div className="container" style={{ y }}>
        <div className="title-wrapper">
          <h2>
            <span className="highlight">What</span> Sets Us Apart <br /> in the Digital World

          </h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Ready to Elevate Your Digital Presence?</h3>
          <motion.button
            onClick={() => {
              add("Click", "Get Started Click");
            }}
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Features;
