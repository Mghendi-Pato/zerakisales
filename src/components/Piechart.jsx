import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);

const Piechart = ({ name, target, achieved }) => {
  const data = {
    labels: ["Target", "Current"],
    datasets: [
      {
        data: [target, achieved],
        backgroundColor: ["#22c55e", "#f59e0b"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: name,
      },
    },
  };
  return (
    <div>
      <Pie data={data} options={options} width={200} height={200} />
    </div>
  );
};

export default Piechart;
