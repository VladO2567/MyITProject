import { useContext, useEffect, useState } from "react";
import "./editProfile.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/authContext.js";
import { makeRequest } from "./../../axios.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { t } = useTranslation();

  const [profImg, setProfImg] = useState(null);
  const [texts, setTexts] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    profilePic: currentUser.profilePic,
  });
  const [initialEmail, setInitialEmail] = useState("");
  const [newEmail, setNewEmail] = useState(false);

  useEffect(() => {
    setInitialEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTexts((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = async () => {
    try {
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let profileUrl = profImg ? await upload(profImg) : texts.profilePic;

    const inputs = { ...texts, profilePic: profileUrl };

    if (texts.email !== initialEmail) {
      setNewEmail(true);
      try {
        await makeRequest.put("/users", inputs);
        setTimeout(() => {
          handleLogOut();
        }, 3000);
        setProfImg(null);
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      try {
        await makeRequest.put("/users", inputs);
        setProfImg(null);
        setCurrentUser(inputs);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="editProfile">
      <h1>{t("editProfile.h1")}</h1>
      <div className="profileWrapper">
        <form>
          <label htmlFor="profileImg">
            <span>{t("img.add")}</span>
            <div className="imgContainer">
              <img
                src={
                  profImg
                    ? URL.createObjectURL(profImg)
                    : texts.profilePic !== ""
                    ? "/upload/" + texts.profilePic
                    : "/upload/noUserImg.jpg"
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
            <span
              onClick={(e) => {
                e.preventDefault();
                profImg
                  ? setProfImg(null)
                  : setTexts((prev) => ({ ...prev, profilePic: "" }));
              }}
              style={{ cursor: "pointer" }}
            >
              {t("img.remove")}
            </span>
          </label>
          <input
            type="file"
            id="profileImg"
            style={{ display: "none" }}
            onChange={(e) => setProfImg(e.target.files[0])}
          />
          <div className="horizDiv">
            <div className="item">
              <label htmlFor="firstName">{t("editProfile.fName")}:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder={t("editProfile.fName")}
                value={texts.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="lastName">{t("editProfile.lName")}:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder={t("editProfile.lName")}
                value={texts.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item">
            <label htmlFor="email">{t("editProfile.email")}</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={texts.email}
              onChange={handleChange}
            />
          </div>
          {newEmail && (
            <p>
              {t("editProfile.newEmail")}
            </p>
          )}
          <button onClick={handleUpdate}>{t("editProfile.btn")}</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
