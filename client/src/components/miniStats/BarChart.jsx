import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ data }) => {
  const options = {
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return value + " €";
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label + ": " + context.formattedValue + "€";
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
