import React from "react";
import "../styles/AboutUs.css"
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const About: React.FC = () => {
    return (
        <>
            <Header/>
            <div className="about-container">
            <section className="about-section">
                <h2>Who We Are?</h2>
                <p>
                    At SeedLink, we are passionate about bridging the gap between visionary entrepreneurs,
                    forward-thinking investors, and impactful charitable causes. Our platform serves as a
                    dynamic ecosystem where groundbreaking ideas meet the resources they need to thrive.
                    Whether you're a startup seeking funding, an investor looking for the next big opportunity,
                    or a nonprofit raising funds for a cause, SeedLink is your trusted partner in fostering
                    growth and innovation.
                </p>
            </section>

            <section className="about-section">
                <h2>What We Do?</h2>
                <p>
                    SeedLink provides a seamless platform for startups, investors, and charitable organizations
                    to connect, collaborate, and succeed.
                </p>
                <ul>
                    <li><strong>For Entrepreneurs:</strong> Showcase your ideas, gain visibility, and attract investors who believe in your vision.</li>
                    <li><strong>For Investors:</strong> Discover promising startups, explore innovative business models, and invest in the future.</li>
                    <li><strong>Fundraising for Charity:</strong> We support nonprofit organizations by providing a dedicated fundraising platform to amplify their impact and connect with donors who want to make a difference.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Our Team</h2>
                <p>
                    Our team consists of industry experts, passionate entrepreneurs, experienced investors,
                    and social impact advocates who share a common goal—fueling innovation and empowering
                    businesses and charities alike. With expertise in finance, technology, and social development,
                    we are committed to creating a platform that fosters meaningful connections and sustainable growth.
                </p>
            </section>
        </div>
        <Footer/>
        </>
    );
}

export default About;