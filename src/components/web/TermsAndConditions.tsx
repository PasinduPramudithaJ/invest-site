import React from "react";
import "../styles/TermsAndConditions.css"

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-container">
      <header>
        <h1>SeedLink - Terms and Conditions</h1>
        <p><strong>Last Updated:</strong> 06.02.2024</p>
      </header>

      <section className="terms-content">
        <p>
          Welcome to <strong>SeedLink</strong>! These <strong>Terms and Conditions</strong> outline the rules and 
          regulations for using our platform. By accessing or using <strong>SeedLink</strong>, you agree to comply 
          with these terms. If you do not agree, please refrain from using our services.
        </p>

        <h2>1. Definitions</h2>
        <ul>
          <li><strong>"SeedLink"</strong> refers to the platform connecting entrepreneurs, investors, and fundraisers for both business and charitable initiatives.</li>
          <li><strong>"User"</strong> refers to anyone accessing or using the platform, including entrepreneurs, investors, donors, and charities.</li>
          <li><strong>"Services"</strong> refer to the online features, tools, and functionalities provided by SeedLink.</li>
          <li><strong>"Content"</strong> refers to any data, text, graphics, or other materials uploaded or shared on the platform.</li>
        </ul>

        <h2>2. Eligibility</h2>
        <ul>
          <li>Users must be at least <strong>18 years old</strong> to access <strong>SeedLink</strong>.</li>
          <li>By using SeedLink, you confirm that the information you provide is <strong>accurate and up-to-date</strong>.</li>
        </ul>

        <h2>3. Account Registration</h2>
        <ul>
          <li>Users must <strong>create an account</strong> to access certain features.</li>
          <li>You are responsible for <strong>maintaining the confidentiality</strong> of your account credentials.</li>
          <li>SeedLink reserves the right to <strong>suspend or terminate accounts</strong> for any violation of these terms.</li>
        </ul>

        <h2>4. Use of Services</h2>
        <ul>
          <li>Users agree to use <strong>SeedLink</strong> <strong>lawfully and ethically</strong>.</li>
          <li><strong>Fraudulent, misleading, or harmful activities</strong> are strictly prohibited.</li>
          <li>Content uploaded must <strong>not infringe</strong> on any third-party rights.</li>
        </ul>

        <h2>5. Fundraising and Investments</h2>
        <ul>
          <li><strong>SeedLink</strong> acts as a <strong>facilitator</strong> and does not <strong>guarantee funding or investment success</strong>.</li>
          <li>Investors are responsible for <strong>conducting their own due diligence</strong> before making investments.</li>
          <li>Fundraising for charitable causes must <strong>comply with legal regulations</strong> and provide <strong>accurate information</strong> about fund usage.</li>
          <li><strong>SeedLink is not liable</strong> for any financial transactions between users.</li>
        </ul>

        <h2>6. Fees and Payments</h2>
        <ul>
          <li>SeedLink may <strong>charge service fees</strong> for specific features, which will be <strong>clearly communicated</strong>.</li>
          <li>All payments processed through the platform are handled by <strong>third-party payment providers</strong>.</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <ul>
          <li>Users retain ownership of their content but grant <strong>SeedLink</strong> a license to <strong>use, display, and distribute</strong> it as necessary.</li>
          <li>Unauthorized reproduction or use of <strong>SeedLink’s branding, trademarks, or content</strong> is prohibited.</li>
        </ul>

        <h2>8. Privacy Policy</h2>
        <ul>
          <li>SeedLink values <strong>user privacy</strong> and follows a <strong>strict privacy policy</strong> regarding data collection and usage.</li>
          <li>Users agree to the collection and processing of their data as outlined in our <strong>Privacy Policy</strong>.</li>
        </ul>

        <h2>9. Limitation of Liability</h2>
        <ul>
          <li>SeedLink is <strong>not responsible</strong> for any <strong>losses, damages, or disputes</strong> arising from interactions between users.</li>
          <li>We <strong>do not guarantee</strong> the accuracy or reliability of any <strong>user-generated content</strong>.</li>
        </ul>

        <h2>10. Termination</h2>
        <ul>
          <li>Users can <strong>terminate their accounts</strong> at any time.</li>
          <li>SeedLink reserves the right to <strong>terminate accounts</strong> that violate these terms <strong>without prior notice</strong>.</li>
        </ul>

        <h2>11. Changes to Terms</h2>
        <ul>
          <li>SeedLink reserves the right to <strong>update these terms</strong> at any time.</li>
          <li>Users will be <strong>notified</strong> of significant changes, and continued use of the platform <strong>implies acceptance</strong>.</li>
        </ul>

        <h2>12. Contact Us</h2>
        <p>For any questions or concerns, please contact us at <strong>+94 712 3456</strong>.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;