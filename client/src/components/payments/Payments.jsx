import { useQuery } from "react-query";
import Payment from "../payment/Payment.jsx";
import "./payments.scss";
import { makeRequest } from "../../axios.js";
import { useTranslation } from "react-i18next";

const Payments = () => {
  const { isLoading, error, data } = useQuery("models", () =>
    makeRequest.get("/models/").then((res) => {
      return res.data;
    })
  );

  const { t } = useTranslation();

  // TEMPORARY
  // eslint-disable-next-line
  const payments = [
    {
      id: 1,
      userId: 1,
      payName: "Mtel",
      recName: "M:tel",
      bankNum: "510",
      accNum: "10322",
      payRefNum: "08-2023",
      payDesc: "Telekom racun za 08.2023",
      payImg: "mtelLogo.png",
      lastPaid: "yesterday",
      amtPaid: 34,
    },
    {
      id: 2,
      userId: 1,
      payName: "Telekom",
      recName: "CRNOGORSKI TELEKOM A.D. PODGORICA",
      bankNum: "540",
      accNum: "77324",
      payRefNum: "E059887310",
      payDesc: "Telekom racun za 08.2023",
      payImg: "telekomLogo.png",
      lastPaid: "Not paid yet",
      amtPaid: 28.32,
    },
    {
      id: 3,
      userId: 1,
      payName: "Vodovod i kanalizacija",
      recName: "",
      bankNum: "",
      accNum: "",
      payRefNum: "",
      payDesc: "Placanje racuna za vodovod i kanalizaciju za mjesec 08/2023",
      payImg: "vikLogo.jpg",
      lastPaid: "12 days ago",
      amtPaid: 11,
    },
    {
      id: 4,
      userId: 1,
      payName: "Gradksa cistoca",
      recName: "Cistoca",
      bankNum: "540",
      accNum: "359530",
      payRefNum: "220003205",
      payDesc: "Placanje racuna",
      payImg: "",
      lastPaid: null,
      amtPaid: null,
    },
    {
      id: 5,
      userId: 1,
      payName: "Elektricna energija",
      recName: "Elektroprivreda Crne Gore AD Nikšić",
      bankNum: "535",
      accNum: "162942",
      payRefNum: "83-193059286-2308",
      payDesc: "Ukupno za uplatu sa racuna na 08/2023",
      payImg: "epcgLogo.webp",
      lastPaid: "1 month ago",
      amtPaid: 45.76,
    },
  ];

  return (
    <div className="payments">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading..."
        : data.length === 0
        ? <p>{t("payments.noPayments")}</p>
        : data.map((payment) => <Payment payment={payment} key={payment.modelId} />)}
    </div>
  );
};

export default Payments;
