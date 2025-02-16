// Save data to LocalStorage
const saveHealthData = (data) => {
    const existingData = JSON.parse(localStorage.getItem("healthData")) || [];
    existingData.push(data);
    localStorage.setItem("healthData", JSON.stringify(existingData));
  };
  
  // Fetch data from LocalStorage
  const getHealthData = () => {
    return JSON.parse(localStorage.getItem("healthData")) || [];
  };
  // Initialize Chart.js
const renderGraph = (data) => {
    const ctx = document.getElementById("healthChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "Heart Rate",
            data: data.map((entry) => entry.heartRate),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });
  };
  
  // Update graph with LocalStorage data
  const updateGraph = () => {
    const data = getHealthData();
    renderGraph(data);
  };
  document.getElementById("addDataBtn").addEventListener("click", () => {
    const date = document.getElementById("dateInput").value;
    const heartRate = parseInt(document.getElementById("heartRateInput").value);
  
    if (date && heartRate) {
      saveHealthData({ date, heartRate });
      updateGraph(); // Re-render the graph
      alert("Data added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  });
  
  // Export data as JSON
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const data = getHealthData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "healthData.json";
    a.click();
  });
  
  
  