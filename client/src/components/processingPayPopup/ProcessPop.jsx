import { useEffect, useState } from "react";
import "./processPop.scss";
import { useNavigate } from "react-router-dom";

const ProcessPop = ({ setShowPopup }) => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

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

  return (
    <div className="payment-processing-container">
      <div className="popup">
        {!paymentSuccessful ? (
          <>
            <div className="loader"></div>
            <p>Processing your payment...</p>
          </>
        ) : (
          <p className="success-message">Payment successful. Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default ProcessPop;
