// client/src/components/PopularityChart.tsx
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PopularityChartProps {
  trackNames: string[];
  popularityData: number[];
}

const PopularityChart = ({ trackNames, popularityData }: PopularityChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: trackNames, // Track names as x-axis labels
          datasets: [
            {
              label: "Popularity",
              data: popularityData, // Popularity values as y-axis
              backgroundColor: "rgba(0, 128, 128, 0.5)", // Teal color for the bars
              borderColor: "rgba(0, 128, 128, 1)", // Darker teal border
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100, // Popularity is between 0 and 100
            },
          },
        },
      });

      // Clean up the chart instance on component unmount
      return () => {
        chartInstance.destroy();
      };
    }
  }, [trackNames, popularityData]); // Re-run the effect when track names or popularity data change

  return <canvas ref={chartRef}></canvas>;
};

export default PopularityChart;
