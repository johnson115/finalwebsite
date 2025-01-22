import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Search, Share2, Palette, DollarSign, FileText } from 'lucide-react';
import '../styles/services.css';

const services = [
  { icon: <Globe />, title: 'Web Development', description: 'Custom websites built to elevate your brand.' },
  { icon: <Search />, title: 'SEO Optimization', description: 'Rank higher and reach your audience organically.' },
  { icon: <Share2 />, title: 'Social Media Marketing', description: 'Boost your online presence and engagement.' },
  { icon: <Palette />, title: 'Branding', description: 'Stand out with compelling visuals and a unique identity.' },
  { icon: <DollarSign />, title: 'PPC Campaigns', description: 'Get measurable results with paid ads.' },
  { icon: <FileText />, title: 'Content Creation', description: 'Engaging content to drive conversions.' },
];

const ServiceCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const Services = React.forwardRef((props , ref) => {
  const [refs, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="services-section">
      <div className="container">
        <motion.h2
          ref={refs}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>Ready to take your business to the next level ?</h3>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           Let's Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

export default Services;

