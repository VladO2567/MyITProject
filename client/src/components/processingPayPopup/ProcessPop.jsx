import { useEffect, useState } from "react";
import "./processPop.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProcessPop = ({ setShowPopup }) => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const handleButtonClick = () => {
      // Simulate a payment processing delay (you can replace this with your actual payment processing logic)
      setTimeout(() => {
        setPaymentSuccessful(true);

        // Clear the success message after a few seconds (you can adjust the timing)
        setTimeout(() => {
          setShowPopup(false);
          setPaymentSuccessful(false);
          navigate("/");
        }, 2000);
      }, 3000); // Adjust the time as needed
    };

    handleButtonClick();
  }, [navigate, setShowPopup]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="payment-processing-container">
      <div className="popup">
        {!paymentSuccessful ? (
          <>
            <div className="loader"></div>
            <p>{t("processPop.processing")}</p>
          </>
        ) : (
          <p className="success-message">{t("processPop.redirecting")}</p>
        )}
      </div>
    </div>
  );
};

export default ProcessPop;
