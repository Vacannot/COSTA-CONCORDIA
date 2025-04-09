import "./App.css";

import { useState, useEffect } from "react";
import { Vehicle } from "./types/types";
import { Route, Routes } from "react-router";

import VehicleInfo from "./pages/VehicleInfo";
import ServiceInfo from "./pages/ServiceInfo";
import Header from "./components/Header";
import VehicleList from "./components/VehicleList";

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:1337/vehicle/list");
      const data = await res.json();
      setVehicles(data.vehicles);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <Header />
      <div style={{ paddingTop: "6em", padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <VehicleList vehicles={vehicles} onRefresh={fetchVehicles} />
            }
          />
          <Route path="/vehicle/:id" element={<VehicleInfo />} />
          <Route path="/vehicle/:id/services" element={<ServiceInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
