import "../Style/Footer.css";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/" class="navbar_logo">
          Car Rental Service
        </a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Rental Policies</li>
          <li>Terms and Conditions</li>
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact Us</h3>
        <div className="footer_right_info">
          <LocationOn />
          <p>Pune, Maharashtra, India</p>
        </div>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+1 800 123 4567</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>support@carrentals.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
