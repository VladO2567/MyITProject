import BarChart from "./BarChart.jsx";
import "./miniStats.scss";
import { getBarData, getListData } from "../../dataUtils.js";
import { useTranslation } from "react-i18next";

const MiniStats = ({ name, payData, setStatsOpen }) => {
  const barData = getBarData(payData);
  const listData = getListData(payData);

  const { t } = useTranslation();

  const data = {
    labels: barData.map((data) => data.yearMonth),
    datasets: [
      {
        label: name,
        data: barData.map((data) => data.totalAmount),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "rgba(0,0,0,0.4)",
        borderWidth: 1,
        barThickness: "flex",
        maxBarThickness: 35,
      },
    ],
  };

  return (
    <div className="miniStats">
      <div className="mStatsContainer">
        <h2>{name} {t("miniStats.spendings")}:</h2>
        <div className="barChart">
          <BarChart data={data} />
        </div>
        <div className="itemContainer">
          {listData.map((data) => (
            <div key={data.id} className="item">
              <span>{data.payedAt}</span>
              <span>{data.payAmount} €</span>
            </div>
          ))}
        </div>
        <button onClick={() => setStatsOpen(false)}>{t("newPayment.closeBtn")}</button>
      </div>
    </div>
  );
};

export default MiniStats;
