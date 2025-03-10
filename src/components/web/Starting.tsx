import React from 'react';
import "../styles/Home.css";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import logo from '../assets/logo1.png'

const Starting : React.FC = () => {
  return (
    <>
       <Header />
          <main className="home-page">
            {/* Hero Section */}
            <section className="hero">
              <div className="logo-image">
                <img src={logo} alt="Company Logo" />
              </div>
              <h1>Welcome to SeedLink</h1>
              <p>Connecting visionary entrepreneurs with forward-thinking investors.</p>
              <div className="buttons">
              </div>
            </section>

            {/* Features Section */}
            <section className="features">
              <h2>Why Choose SeedLink?</h2>
              <div className="features-grid">
                <div className="feature">
                  <h3>For Entrepreneurs</h3>
                  <p>Gain access to a network of investors and resources to fuel your growth.</p>
                </div>
                <div className="feature">
                  <h3>For Investors</h3>
                  <p>Discover high-potential startups and diversify your investment portfolio.</p>
                </div>
                <div className="feature">
                  <h3>Secure & Transparent</h3>
                  <p>We ensure a safe and fair environment for entrepreneurs and investors alike.</p>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
              <h2>What Our Users Say</h2>
              <div className="testimonial-cards">
                <div className="testimonial">
                  <p>"SeedLink helped me secure funding for my startup in just a few months!"</p>
                  <h4>- M. Senevirathne</h4>
                </div>
                <div className="testimonial">
                  <p>"An excellent platform for investors to find unique and promising businesses."</p>
                  <h4>- K. Sukhitha</h4>
                </div>
              </div>
            </section>
          </main>
      <Footer />
    </>
  );
};

export default Starting;
