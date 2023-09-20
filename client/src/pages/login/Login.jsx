import "./login.scss";
import Logo from "../../assets/high-resolution-logo-transparent-background.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [ isChecked, setIsChecked] = useState(false);

  const { t } = useTranslation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  //console.log(loginData);

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginData.email === "" || loginData.password === "") {
      setErr(t("login.err"));
    } else {
      try {
        await login({...loginData, rememberMe: isChecked});
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  return (
    <div className="login">
      <img src={Logo} alt="LOGO" />
      <div className="bull">
        <h3>{t("login.firsth1")}</h3>
        <h3>{t("login.secondh1")}</h3>
      </div>
      <div className="container">
        <div className="form">
          <h1>{t("login.title")}</h1>
          <form>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder={t("login.pass")}
              value={loginData.password}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err}</p>}
            <div className="bttns">
              <div className="checkbox">
                <input value={isChecked} type="checkbox" id="chbox" onClick={() => setIsChecked(!isChecked)} />{" "}
                <label htmlFor="chbox">{t("login.rmMe")}</label>
              </div>
              <button onClick={handleLogin}>{t("login.btn")}</button>
            </div>
          </form>
        </div>
        <div className="more">
          <span onClick={() => navigate("/register")} className="reg">
            {t("login.register")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
