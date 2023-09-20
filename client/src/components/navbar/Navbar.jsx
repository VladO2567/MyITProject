import "./navbar.scss";
import Logo from "../../assets/logo-no-background.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "./../../axios.js";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { i18n } = useTranslation();



  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const lngs = {
    en: { nativeName: "English" },
    mne: { nativeName: "Montenegrin" },
  };

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
        <LanguageOutlinedIcon
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          style={{ cursor: "pointer", zIndex: "99999" }}
        />
        <NotificationsOutlinedIcon />
        <LogoutOutlinedIcon
          onClick={handleLogOut}
          style={{ cursor: "pointer" }}
        />
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
          {langMenuOpen && (
            <div className="langMenu">
              {Object.keys(lngs).map((lng) => (
                <button
                  key={lng}
                  type="submit"
                  onClick={() => {
                    i18n.changeLanguage(lng);
                    setLangMenuOpen(false);
                  }}
                >
                  {lngs[lng].nativeName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
