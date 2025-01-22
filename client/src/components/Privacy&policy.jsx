import React from "react";
import "../styles/privacy.css"; // External CSS for styling and animations
import { Lock, Shield, Cookie, RefreshCw } from "lucide-react"; // Lucide-react icons

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <header className="privacy-header">
        <Lock className="privacy-icon" />
        <h1>Privacy Policy</h1>
      </header>

      <section className="privacy-section">
        <h2>
          <Shield className="icon" /> Information We Collect
        </h2>
        <p>
          We collect personal information like your name, email address, phone
          number, and billing details when you interact with us.
        </p>
        <p>
          We also collect non-personal data, such as browser type and IP
          address, to enhance our services.
        </p>
      </section>

      <section className="privacy-section">
        <h2>
          <RefreshCw className="icon" /> How We Use Your Information
        </h2>
        <p>We use your data for service delivery, communication, and analytics.</p>
        <p>
          Your information helps us comply with legal obligations and ensure
          secure transactions.
        </p>
      </section>

      <section className="privacy-section">
        <h2>
          <Cookie className="icon" /> Cookies and Tracking
        </h2>
        <p>
          Our website uses cookies to improve your experience, monitor
          performance, and deliver personalized content.
        </p>
        <p>You can manage cookies via your browser settings.</p>
      </section>

      <footer className="privacy-footer">
        <p>
          If you have any questions, please contact us at{" "}
          <strong>contact@digitalmoveup.com</strong> or call{" "}
          <strong>+216 28 879 855</strong>.
        </p>
        <p className="footer-note">© Digital Move Up. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
