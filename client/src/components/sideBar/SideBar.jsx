import "./sideBar.scss";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

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

  return (
    <div className="sideBar">
      <div className="container">
        <div className="top menu">
          <div onClick={() => navigate("/")} className="item">
            <SpeedOutlinedIcon />
            <span>{t("sideBar.dash")}</span>
          </div>
          <div className="item">
            <EqualizerOutlinedIcon />
            <span>{t("sideBar.spens")}</span>
          </div>
          <div className="item">
            <ArticleOutlinedIcon />
            <span>{t("sideBar.recips")}</span>
          </div>
        </div>

        <div className="bot menu">
          <div className="item">
            <SettingsOutlinedIcon />
            <span>{t("sideBar.pref")}</span>
          </div>
          <div onClick={() => navigate("/profile")} className="item">
            <PersonIcon />
            <span>{t("sideBar.edit")}</span>
          </div>
          <div className="item" onClick={handleLogOut}>
            <LogoutOutlinedIcon />
            <img
              src={
                currentUser.profilePic !== ""
                  ? "/upload/" + currentUser.profilePic
                  : "/upload/noUserImg.jpg"
              }
              alt=""
            />
            <span>{t("sideBar.lout")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
