import "./register.scss";
import Logo from "../../assets/high-resolution-logo-transparent-background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const { t } = useTranslation();

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { profilePic, ...theRest } = inputs;

    if (Object.values(theRest).includes("")) {
      setErr(t("register.err"));
    } else {
      try {
        await axios.post("http://localhost:9200/api/auth/register", inputs);
        navigate("/login");
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  return (
    <div className="register">
      <img src={Logo} alt="LOGO" />
      <div className="bull">
        <h3>{t("register.firsth1")}</h3>
        <h3>{t("register.secondh1")}</h3>
        <h3>{t("register.thirdh1")}</h3>
      </div>
      <div className="container">
        <div className="form">
          <h1>{t("register.title")}</h1>
          <form>
            <div className="name">
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                placeholder={t("editProfile.fName")}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                placeholder={t("editProfile.lName")}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              value={inputs.email}
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={inputs.password}
              placeholder={t("login.pass")}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err}</p>}
            <button onClick={handleRegister}>{t("register.btn")}</button>
          </form>
        </div>
        <div className="more">
          <span onClick={() => navigate("/login")} className="log">
            {t("register.login")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
