import { useEffect } from "react";
import HomeHead from "../../components/homeHead/HomeHead.jsx";
import Payments from "../../components/payments/Payments.jsx";
import "./home.scss";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div className="home">
      <div className="homeWrapper">
        <HomeHead />
        <Payments />
      </div>
    </div>
  );
};

export default Home;
