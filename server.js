import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const HealthGraph = ({ userId }) => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch health data for the user
    const fetchHealthData = async () => {
      try {
        const response = await axios.get(`/api/health-data?userId=${userId}`);
        setHealthData(response.data);
      } catch (error) {
        console.error("Error fetching health data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [userId]);

  const chartData = {
    labels: healthData.map((entry) => entry.date),
    datasets: [
      {
        label: "Heart Rate",
        data: healthData.map((entry) => entry.heartRate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Heart Rate (bpm)" } },
    },
  };

  return (
    <Card className="w-full p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Health Graph</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
        <Button className="mt-4" onClick={() => alert("Export functionality coming soon!")}>
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthGraph;
