import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";

ChartJs.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Barchart = ({ name, primary, secondary, IGCSE }) => {
  const data = {
    labels: ["Primary", "Secondary", "IGCSE"],
    datasets: [
      {
        label: "",
        data: [primary, secondary, IGCSE],
        backgroundColor: ["#f59e0b", "#22c55e", "#f43f5e"],
        borderColor: ["#e2e8f0"],
        borderWidth: 1,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: name,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={`h-88`}>
      <Bar options={options} data={data} height={350} />
    </div>
  );
};

export default Barchart;
