import { useEffect, useState } from "react";
import "./pay.scss";
import ProcessPop from "../../components/processingPayPopup/ProcessPop.jsx";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useQuery } from "react-query";

const Pay = () => {
  const [texts, setTexts] = useState({
    payName: "",
    recName: "",
    bankNum: "",
    accNum: "",
    payRefNum: "",
    payDesc: "",
    payImg: "",
    payAmount: "",
  });

  const modelId = parseInt(useLocation().pathname.split("/")[2]);

  const [err, setErr] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const banks = [
    {
      text: "510 - CRNOGORSKA KOMERCIJALNA BANKA",
      value: 510,
    },
    {
      text: "520 - HIPOTEKARNA BANKA",
      value: 520,
    },
    {
      text: "530 - NLB BANK AD PODGORICA",
      value: 530,
    },
    {
      text: "540 - ERSTE AD PODGORICA",
      value: 540,
    },
    {
      text: "535 - PRVA BANKA CRNE GORE",
      value: 535,
    },
    {
      text: "555 - ADDIKO BANK A.D. PODGORICA",
      value: 555,
    },
    {
      text: "565 - LOVĆEN BANKA AD PODGORICA",
      value: 565,
    },
    {
      text: "840 - UPRAVA POLICIJE",
      value: 840,
    },
  ];

  const { data } = useQuery(["model", modelId], () =>
    makeRequest.get("/models/" + modelId).then((res) => {
      return res.data[0];
    })
  );

  useEffect(() => {
    if (data) {
      setTexts({
        payName: data.payName || "",
        recName: data.recName || "",
        bankNum: data.bankNum || "",
        accNum: data.accNum || "",
        payRefNum: data.payRefNum || "",
        payDesc: data.payDesc || "",
        payImg: data.payImg || "",
        payAmount: "",
      });
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "payAmount") {
      if (/^\d*\.?\d*$/.test(value)) {
        setTexts((prev) => ({ ...prev, [name]: value }));
      }
    } else setTexts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { payImg, ...theRest } = texts;

    const sendData = { modelId, ...theRest };

    if (Object.values(theRest).includes("")) {
      setErr("At least one field is empty!");
    } else {
      setShowPopup(true);
      try {
        await makeRequest.post("/payments/", sendData);
        setErr(null);
      } catch (err) {
        setErr(err.response.data);
      }
      console.log(sendData);
    }
  };

  return (
    <div className="pay">
      <h1>Complete your payment</h1>
      <div className="payWrapper">
        <div className="horizDiv">
          {texts.payImg !== "" && (
            <img src={"/upload/" + texts.payImg} alt="" />
          )}
          <h3>Payment: {texts.payName}</h3>
        </div>
        <form>
          <div className="item">
            <label htmlFor="recName">Name of the receiver:</label>
            <input
              type="text"
              name="recName"
              id="recName"
              placeholder="Name of the receiver"
              value={texts.recName}
              onChange={handleChange}
            />
          </div>
          <div className="horizDiv">
            <div className="item">
              <label htmlFor="bankNum">Bank of the receiver:</label>
              <select
                name="bankNum"
                id="bankNum"
                value={texts.bankNum}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Choose receiver bank
                </option>
                {banks.map((bank) => (
                  <option value={bank.value} key={bank.value}>
                    {bank.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="item">
              <label htmlFor="accNum">Account number:</label>
              <input
                type="number"
                min="0"
                name="accNum"
                id="accNum"
                placeholder="Account number"
                value={texts.accNum}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "-") e.preventDefault();
                }}
              />
            </div>
          </div>
          <div className="horizDiv">
            <div className="item">
              <label htmlFor="payRefNum">Payment reference number:</label>
              <input
                type="text"
                name="payRefNum"
                id="payRefNum"
                placeholder="Payment reference number"
                value={texts.payRefNum}
                onChange={handleChange}
              />
            </div>

            <div className="item">
              <label htmlFor="payDesc">Payment description:</label>
              <input
                type="text"
                name="payDesc"
                id="payDesc"
                placeholder="Payment description"
                value={texts.payDesc}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item">
            <label htmlFor="payAmount">Amount: (€)</label>
            <input
              type="text"
              name="payAmount"
              id="payAmount"
              placeholder="Amount"
              value={texts.payAmount}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <h3>Choose the payment method:</h3>
            <div className="horizDiv">
              <label>
                <input type="radio" value="Card" name="pMethod" disabled />
                Credit card (work in progress)
              </label>
              <label>
                <input type="radio" value="Free" name="pMethod" />
                It's free :D
              </label>
            </div>
          </div>

          {err && <p style={{ color: "red" }}>{err}</p>}
          <button onClick={handleSubmit}>Complete the payment</button>
        </form>
      </div>
      {showPopup && <ProcessPop setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Pay;
