import { useState } from "react";
import "./newPayment.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";

const NewPayment = ({ payment, setOpenForm }) => {
  const [mImg, setMImg] = useState(null);
  const [err, setErr] = useState(null);

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
          {payment ? <h1>Edit your payment</h1> : <h1>Create new payment</h1>}
          <button className="close" onClick={() => setOpenForm(false)}>
            Close
          </button>
        </div>
        <form>
          <div className="first inF">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="item">
                <label htmlFor="payName">Payment name:</label>
                <input
                  type="text"
                  name="payName"
                  id="payName"
                  placeholder="Name"
                  value={texts.payName}
                  onChange={handleChange}
                />
              </div>
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
            </div>
            <label htmlFor="mImg">
              <span>Choose Picture</span>
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
                Remove picture
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
          <div className="itemContainer">
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
          {err && <p style={{ color: "red" }}>{err}</p>}
          {payment ? (
            <button onClick={handleClick}>Update</button>
          ) : (
            <button onClick={handleClick}>Create</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewPayment;
