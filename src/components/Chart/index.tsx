import React from "react";
import ReactApexChart from "react-apexcharts";

interface Idata {
  isDate: number[];
}
const Chart: React.FC<Idata> = ({ isDate }) => {
  const colors = [
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
  ];

  const chartData = {
    series: [
      {
        data: [...isDate],
      },
    ],
    options: {
      chart: {
        height: 160,
        type: "bar",
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ["Sun"],
          ["Mon"],
          ["Tue"],
          ["Wed"],
          ["Thu"],
          ["Fri"],
          ["Sat"],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options as any}
        series={chartData.series as any}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default Chart;
