import "./register.scss";
import Logo from "../../assets/high-resolution-logo-transparent-background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();

    const { profilePic, ...theRest } = inputs;

    if (Object.values(theRest).includes("")){
      setErr("At least one of the values is empty!")
    } else {
      try {
        await axios.post("http://localhost:9200/api/auth/register", inputs);
        navigate("/login");
      } catch (err) {
        setErr(err.response.data);
      }
    }
  }

  return (
    <div className="register">
      <img src={Logo} alt="LOGO" />
      <div className="bull">
        <h3>BEGIN YOU JOURNEY</h3>
        <h3>OF SAFE AND EASY PAYMENTS</h3>
        <h3>TODAY</h3>
      </div>
      <div className="container">
        <div className="form">
          <h1>Register</h1>
          <form>
            <div className="name">
              <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                placeholder="First name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                placeholder="Last name"
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
              placeholder="Password"
              onChange={handleChange}
            />
            {err && <p style={{color: "red"}}>{err}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
        <div className="more">
          <span onClick={() => navigate("/login")} className="log">
            Already have an accout? Log in!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
