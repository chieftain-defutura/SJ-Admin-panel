import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Button from "../button";

interface Idata {
  data: {
    day: string;
    value: number;
  }[];
  yearChartData: {
    month: string;
    value: number;
  }[];
  weekChartData: {
    week: string;
    value: number;
  }[];
}
const Chart: React.FC<Idata> = ({ data, yearChartData, weekChartData }) => {
  const [day, setDay] = useState<"Week" | "Month" | "Year">("Week");
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
    toolbar: { show: false },
    options: {
      chart: {
        height: 160,
        type: "bar",
        toolbar: {
          show: false,
        },
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

  const weekSeriesData = weekChartData.map((f) => f.value);
  const weekSCategoriesData = weekChartData.map((f) => f.week);
  const weekChart = {
    price: [
      {
        data: weekSeriesData,
      },
    ],
    toolbar: { show: false },
    options: {
      chart: {
        height: 160,
        type: "bar",
        toolbar: {
          show: false,
        },
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
        categories: weekSCategoriesData,
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  };

  const yearSeriesData = yearChartData.map((f) => f.value);
  const yearSCategoriesData = yearChartData.map((f) => f.month);

  const yearChart = {
    price: [
      {
        data: yearSeriesData,
      },
    ],
    toolbar: { show: false },
    options: {
      chart: {
        height: 160,
        type: "bar",
        toolbar: {
          show: false,
        },
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
        categories: yearSCategoriesData,
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
      <div
        className="head"
        style={{
          display: "flex",
          // flexDirection: "row",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <div className={day === "Week" ? "active-btn" : ""}>
          <Button varient="secondary" onClick={() => setDay("Week")}>
            week
          </Button>
        </div>
        <div className={day === "Month" ? "active-btn" : ""}>
          <Button varient="secondary" onClick={() => setDay("Month")}>
            month
          </Button>
        </div>
        <div className={day === "Year" ? "active-btn" : ""}>
          <Button varient="secondary" onClick={() => setDay("Year")}>
            year
          </Button>
        </div>
      </div>
      {day === "Week" && (
        <ReactApexChart
          options={chartData.options as any}
          series={chartData.price}
          type="bar"
          height={chartData.options.chart.height}
        />
      )}
      {day === "Month" && (
        <ReactApexChart
          options={weekChart.options as any}
          series={weekChart.price}
          type="bar"
          height={weekChart.options.chart.height}
        />
      )}{" "}
      {day === "Year" && (
        <ReactApexChart
          options={yearChart.options as any}
          series={yearChart.price}
          type="bar"
          height={yearChart.options.chart.height}
        />
      )}
    </div>
  );
};

export default Chart;
