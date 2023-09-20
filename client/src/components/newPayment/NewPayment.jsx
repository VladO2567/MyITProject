import { useState } from "react";
import "./newPayment.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";
import { useTranslation } from "react-i18next";

const NewPayment = ({ payment, setOpenForm }) => {
  const [mImg, setMImg] = useState(null);
  const [err, setErr] = useState(null);

  const { t } = useTranslation();

  const [texts, setTexts] = useState(
    payment !== undefined
      ? {
          payName: payment.payName,
          recName: payment.recName,
          bankNum: payment.bankNum,
          accNum: payment.accNum,
          payRefNum: payment.payRefNum,
          payDesc: payment.payDesc,
          payImg: payment.payImg,
        }
      : {
          payName: "",
          recName: "",
          bankNum: "",
          accNum: "",
          payRefNum: "",
          payDesc: "",
          payImg: "",
        }
  );
  // PROB NOT TEMPORARY
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

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (model) => {
      return makeRequest.post("/models/", model);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("models");
      },
    }
  );

  const updateMutation = useMutation(
    (updatedModel) => {
      return makeRequest.put("/models/" + payment.modelId, updatedModel);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("models");
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let modelUrl = mImg ? await upload(mImg) : texts.payImg;

    const { payImg, ...inputs } = texts;

    if (Object.values(inputs).includes("")) {
      setErr("At least one field is empty!");
    } else {
      payment
        ? updateMutation.mutate({ ...texts, payImg: modelUrl })
        : createMutation.mutate({ ...texts, payImg: modelUrl });
      setErr(null);
      setMImg(null);
      setOpenForm(false);
    }
  };

  return (
    <div className="newPayment">
      <div className="nPaymentContainer">
        <div className="first">
          {payment ? (
            <h1>{t("newPayment.h1U")}</h1>
          ) : (
            <h1>{t("newPayment.h1C")}</h1>
          )}
          <button className="close" onClick={() => setOpenForm(false)}>
            {t("newPayment.closeBtn")}
          </button>
        </div>
        <form>
          <div className="first inF">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="item">
                <label htmlFor="payName">{t("newPayment.pName")}:</label>
                <input
                  type="text"
                  name="payName"
                  id="payName"
                  placeholder={t("newPayment.pName")}
                  value={texts.payName}
                  onChange={handleChange}
                />
              </div>
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
            </div>
            <label htmlFor="mImg">
              <span>{t("img.add")}</span>
              <div className="imgContainer">
                <img
                  src={
                    mImg
                      ? URL.createObjectURL(mImg)
                      : texts.payImg !== ""
                      ? "/upload/" + texts.payImg
                      : "/upload/noNoImg.jpg"
                  } // TODO: LOAD IMAGE PATH FROM DATABASE
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  mImg
                    ? setMImg(null)
                    : setTexts((prev) => ({ ...prev, payImg: "" }));
                }}
                style={{ cursor: "pointer" }}
              >
                {t("img.remove")}
              </span>
            </label>
            <input
              type="file"
              id="mImg"
              style={{ display: "none" }}
              onChange={(e) => setMImg(e.target.files[0])}
            />
          </div>
          <div className="itemContainer">
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
          <div className="itemContainer">
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
          {err && <p style={{ color: "red" }}>{err}</p>}
          {payment ? (
            <button onClick={handleClick}>{t("newPayment.uBtn")}</button>
          ) : (
            <button onClick={handleClick}>{t("newPayment.cBtn")}</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewPayment;
