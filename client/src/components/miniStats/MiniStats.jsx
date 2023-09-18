import BarChart from "./BarChart.jsx";
import "./miniStats.scss";
import { getBarData, getListData } from "../../dataUtils.js";

const MiniStats = ({ name, payData, setStatsOpen }) => {
  const barData = getBarData(payData);
  const listData = getListData(payData);

  const data = {
    labels: barData.map((data) => data.yearMonth),
    datasets: [
      {
        label: name,
        data: barData.map((data) => data.totalAmount),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1,
        barThickness: "flex",
        maxBarThickness: 45,
      },
    ],
  };

  return (
    <div className="miniStats">
      <div className="mStatsContainer">
        <h2>{name} spendings</h2>
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
        <button onClick={() => setStatsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default MiniStats;
