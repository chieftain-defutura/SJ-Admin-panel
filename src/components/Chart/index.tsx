import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart: React.FC = () => {
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
        data: [1000, 22, 10, 208, 16, 20, 3000],
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
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default Chart;
