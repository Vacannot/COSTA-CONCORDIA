import "./App.css";

import { useState, useEffect } from "react";
import { Vehicle, VehicleServiceStatus } from "./types/types";
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

  const [vehicleServices, setVehicleServices] = useState<
    Record<string, VehicleServiceStatus>
  >({});

  const fetchServicesForVehicle = async (id: string) => {
    const cached = localStorage.getItem(`services-${id}`);
    if (cached) {
      setVehicleServices((prev) => ({
        ...prev,
        [id]: JSON.parse(cached),
      }));
    } else {
      const res = await fetch(
        `http://localhost:1337/vehicle/services?id=${id}`
      );
      const data = await res.json();
      localStorage.setItem(`services-${id}`, JSON.stringify(data));
      setVehicleServices((prev) => ({
        ...prev,
        [id]: data,
      }));
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "6em", padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <VehicleList
                vehicles={vehicles}
                fetchServices={fetchServicesForVehicle}
              />
            }
          />
          <Route
            path="/vehicle/:id"
            element={
              <VehicleInfo
                vehicleServices={vehicleServices}
                fetchServices={fetchServicesForVehicle}
              />
            }
          />
          <Route
            path="/vehicle/:id/services"
            element={<ServiceInfo vehicleServices={vehicleServices} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
