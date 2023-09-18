import "./footer.scss";
import Logo from "../../assets/logo-no-background.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="left">
          <h2>CONTACT US</h2>
          <div className="contact">
            <div className="cInfo">
              <PhoneIcon />
              <span>Mob: +382 68 651 823</span>
            </div>
            <div className="cInfo">
              <EmailIcon />
              <span>paywave@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={Logo} alt="" />
          <div className="social">
            <LinkedInIcon />
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
