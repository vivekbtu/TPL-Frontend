import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/stats/stats.action";
import { Bar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function MobileGraph() {
  let { data } = useSelector((store) => store.auth);
  let { statsData } = useSelector((store) => store.statData);
  let disptach = useDispatch();

  let dept = ["FIN", "MAN", "QLT", "STO", "STR"];
  let depts = [];

  let tots = [];
  let clsd = [];

  for (let i = 0; i < statsData.length; i++) {
    let per = (statsData[i].closedCount / statsData[i].total) * 100;
    depts.push([`${per.toFixed(2)}%`, dept[i]]);
    tots.push(statsData[i].total);
    clsd.push(statsData[i].closedCount);
  }

  // Custom plugin to render circles in the legend
  const legendPlugin = {
    id: 'customLegend',
    beforeDraw(chart) {
      const { ctx, legend } = chart;
      legend.legendItems.forEach((legendItem, index) => {
        ctx.save();
        ctx.fillStyle = legendItem.fillStyle;
        const { left, top, width, height } = legend.legendHitBoxes[index];
        const x = left + width / 2;
        const y = top + height / 2;
        const radius = Math.min(width, height) / 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });
    }
  };

  //chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        max: Math.max(...tots, ...clsd) + 1,
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  // chart data
  const chartData = {
    labels: depts,
    datasets: [
      {
        label: "total",
        backgroundColor: "#025aab",
        barPercentage: 0.2,
        categoryPercentage: 0.5,
        borderRadius: 10,
        data: tots,
      },
      {
        label: "closed",
        backgroundColor: "#5aa647",
        barPercentage: 0.2,
        categoryPercentage: 0.5,
        borderRadius: 10,
        data: clsd,
      },
    ],
  };

  useEffect(() => {
    disptach(getStats(data));
  }, []);
  return (
    <Box w="90%" m="auto" pb="80px" mt="20px">
      <Box>
        <Text fontSize={"xl"}>Department wise - Total vs Closed</Text>
      </Box>
      <Box
        w="100%"
        h="55vh"
        mt="20px"
        bg="#FFFFFF"
        py={"30px"}
        px="10px"
        borderRadius={"10px"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      >
        <Bar
          data={chartData}
          options={chartOptions}
          plugins={[ChartDataLabels]}
        />
      </Box>
    </Box>
  );
}
