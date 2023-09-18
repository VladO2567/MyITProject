import { useEffect, useRef, useState } from "react";
import "./payment.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NewPayment from "../newPayment/NewPayment.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";
import MiniStats from "../miniStats/MiniStats.jsx";

const Payment = ({ payment }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const menuRef = useRef(null);
  const openButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target !== openButtonRef.current
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const modelId = payment.modelId;

  const { isLoading, data: payData } = useQuery(["payments", modelId], () =>
    makeRequest.get("/payments?modelId=" + modelId).then((res) => {
      return res.data;
    })
  );

  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/\//g, ".");
  }

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (modelId) => {
      return makeRequest.delete("/models/" + modelId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("models");
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(payment.modelId);
  };

  return (
    <div className="payment">
      <div className="container">
        <div className="part">
          <h3>{payment.payName}</h3>
          <div className="icons">
            <MoreHorizIcon
              ref={openButtonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ cursor: "pointer" }}
            />
            {menuOpen && (
              <div
                ref={menuRef}
                className={payment.img === "" ? "miniMenu noPic" : "miniMenu"}
              >
                <button onClick={() => setOpenForm(true)}>Edit</button>
                <button onClick={handleDelete}>Remove</button>
              </div>
            )}
            {payment.payImg !== "" && (
              <img src={"/upload/" + payment.payImg} alt="" />
            )}
          </div>
        </div>
        <div className="info">
          <span>
            <b>Last paid:</b>{" "}
            {payment.lastPaid !== null ? formatDate(payment.lastPaid) : "Never"}
          </span>
          <span>
            <b>Amount paid:</b>{" "}
            {payment.paidAmt !== null ? payment.paidAmt + " €" : "--"}
          </span>
        </div>
        <div className="part">
          <button
            onClick={() => setStatsOpen(true)}
            className="bttn"
            disabled={!isLoading && payData.length === 0}
          >
            More
          </button>
          <button
            onClick={() => navigate("/pay/" + payment.modelId)}
            className="bttn pay"
          >
            Pay
          </button>
        </div>
      </div>
      {openForm && <NewPayment payment={payment} setOpenForm={setOpenForm} />}
      {!isLoading && statsOpen && (
        <MiniStats
          name={payment.payName}
          payData={payData}
          setStatsOpen={setStatsOpen}
        />
      )}
    </div>
  );
};

export default Payment;
