import "./login.scss";
import Logo from "../../assets/high-resolution-logo-transparent-background.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);

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
      setErr("One or both values are left empty!");
    } else {
      try {
        await login(loginData);
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
        <h3>ENJOY YOUR EASY AND SECURE PAYMENTS</h3>
        <h3>WITH US</h3>
      </div>
      <div className="container">
        <div className="form">
          <h1>Login</h1>
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
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err}</p>}
            <div className="bttns">
              <div className="checkbox">
                <input type="checkbox" id="chbox" />{" "}
                <label htmlFor="chbox">Remember me</label>
              </div>
              <button onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
        <div className="more">
          <span>Forgot your password?</span>
          <span onClick={() => navigate("/register")} className="reg">
            Don't have an accout? Register!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
