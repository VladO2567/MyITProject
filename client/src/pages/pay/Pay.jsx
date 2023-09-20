import { useEffect, useState } from "react";
import "./pay.scss";
import ProcessPop from "../../components/processingPayPopup/ProcessPop.jsx";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const { t } = useTranslation();

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
      setErr(t("register.err"));
    } else {
      setShowPopup(true);
      try {
        setIsButtonDisabled(true);
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
      <h1>{t("pay.h1")}</h1>
      <div className="payWrapper">
        <div className="horizDiv">
          {texts.payImg !== "" && (
            <img src={"/upload/" + texts.payImg} alt="" />
          )}
          <h3>
            {t("pay.title")}: {texts.payName}
          </h3>
        </div>
        <form>
          <div className="item">
            <label htmlFor="recName">{t("newPayment.rName")}:</label>
            <input
              type="text"
              name="recName"
              id="recName"
              placeholder={t("newPayment.rName")}
              value={texts.recName}
              onChange={handleChange}
            />
          </div>
          <div className="horizDiv">
            <div className="item">
              <label htmlFor="bankNum">{t("newPayment.rBank")}:</label>
              <select
                name="bankNum"
                id="bankNum"
                value={texts.bankNum}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  {t("newPayment.chooseRecBank")}
                </option>
                {banks.map((bank) => (
                  <option value={bank.value} key={bank.value}>
                    {bank.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="item">
              <label htmlFor="accNum">{t("newPayment.accNum")}:</label>
              <input
                type="number"
                min="0"
                name="accNum"
                id="accNum"
                placeholder={t("newPayment.accNum")}
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
              <label htmlFor="payRefNum">{t("newPayment.pRefNum")}:</label>
              <input
                type="text"
                name="payRefNum"
                id="payRefNum"
                placeholder={t("newPayment.pRefNum")}
                value={texts.payRefNum}
                onChange={handleChange}
              />
            </div>

            <div className="item">
              <label htmlFor="payDesc">{t("newPayment.pDesc")}:</label>
              <input
                type="text"
                name="payDesc"
                id="payDesc"
                placeholder={t("newPayment.pDesc")}
                value={texts.payDesc}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="item">
            <label htmlFor="payAmount">{t("pay.amt")}: (€)</label>
            <input
              type="text"
              name="payAmount"
              id="payAmount"
              placeholder={t("pay.amt")}
              value={texts.payAmount}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <h3>{t("pay.pMethod")}:</h3>
            <div className="horizDiv">
              <label>
                <input type="radio" value="Card" name="pMethod" disabled />
                {t("pay.cCard")}
              </label>
              <label>
                <input type="radio" value="Free" name="pMethod" />
                {t("pay.freeOption")}
              </label>
            </div>
          </div>

          {err && <p style={{ color: "red" }}>{err}</p>}
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            {t("pay.btn")}
          </button>
        </form>
      </div>
      {showPopup && <ProcessPop setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Pay;
