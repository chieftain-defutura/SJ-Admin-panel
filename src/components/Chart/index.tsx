import React from "react";
import ReactApexChart from "react-apexcharts";

interface Idata {
  data: {
    day: string;
    value: number;
  }[];
}
const Chart: React.FC<Idata> = ({ data }) => {
  const colors = [
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
    "#8C73CB",
  ];
  const seriesData = data.map((f) => f.value);

  const categoriesData = data.map((f) => f.day);

  const chartData = {
    price: [
      {
        data: seriesData,
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
        categories: categoriesData,
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
        series={chartData.price}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default Chart;
