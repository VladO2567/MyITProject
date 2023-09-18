import "./navbar.scss";
import Logo from "../../assets/logo-no-background.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "./../../axios.js";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try{
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar">
      <div className="left">
        <img
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          src={Logo}
          alt="LOGO"
        />
      </div>
      <div className="right">
        <LanguageOutlinedIcon />
        <NotificationsOutlinedIcon />
        <LogoutOutlinedIcon onClick={handleLogOut} style={{cursor: "pointer"}} />
        <div className="user">
          <span>
            {currentUser.firstName} {currentUser.lastName}
          </span>
          <img
            src={
              currentUser.profilePic !== ""
                ? "/upload/" + currentUser.profilePic
                : "/upload/noUserImg.jpg"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
