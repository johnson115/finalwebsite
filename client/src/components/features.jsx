import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Rocket, Zap, Users, TrendingUp, Globe } from 'lucide-react';
import '../styles/features.css';

const features = [
  {
    icon: <Lightbulb />,
    title: 'Innovative Solutions',
    description: 'We bring fresh ideas to the table, helping you stand out in the competitive digital space.'
  },
  {
    icon: <Rocket />,
    title: 'Proven Expertise',
    description: 'With over 2 years of experience, we\'ve helped businesses thrive through tailored strategies.'
  },
  {
    icon: <Zap />,
    title: 'Fast Turnaround',
    description: 'Our efficient workflows ensure your project is completed on time, every time.'
  },
  {
    icon: <Users />,
    title: 'Client-Centric Focus',
    description: 'We value collaboration and keep you informed at every step of the process.'
  },
  {
    icon: <TrendingUp />,
    title: 'Results You Can Measure',
    description: 'We prioritize ROI, delivering measurable outcomes that drive your success.'
  },
  {
    icon: <Globe />,
    title: 'Global Reach',
    description: 'Our solutions connect you with audiences worldwide, expanding your business opportunities.'
  }
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
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
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

const Features = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <section className="features-section">
      <AnimatedBackground />
      <motion.div 
        className="container"
        style={{ y }}
      >
        <div className="title-wrapper">
          <h2>
            <span className="highlight">What</span> Makes Us Different
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
};

export default Features;

