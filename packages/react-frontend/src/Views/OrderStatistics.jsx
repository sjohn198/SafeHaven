import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "../Styles/Navbar.css";
import { addAuthHeader } from "../Components/helpers";

Chart.register(...registerables);

function Histogram() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://safehavenapp.azurewebsites.net//user-stats", {
        headers: addAuthHeader()
      })
      .then(res => res.json())
      .then(responseData => {
        const sortedData = Object.entries(responseData).sort(([labelA], [labelB]) => labelA.localeCompare(labelB));
        const sortedLabels = sortedData.map(([label]) => label);
        const sortedNumbers = sortedData.map(([, number]) => number);
        setData(sortedNumbers);
        setLabels(sortedLabels);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("histogram-chart");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Histogram",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear", 
            beginAtZero: true,
          },
        },
      },
    });
    setChartInstance(newChartInstance);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas id="histogram-chart" style={{ width: '100px', height: '100px' }}></canvas>;
}

export default Histogram;
