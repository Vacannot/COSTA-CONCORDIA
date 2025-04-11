import "./App.css";

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Vehicle } from "./types/types";

import Header from "./components/Header";
import VehicleList from "./components/VehicleList";
import ServiceInfo from "./pages/ServiceInfo";
import VehicleInfo from "./pages/VehicleInfo";

import { fetchVehicles } from "./utils/fetchVehicles";
import BreadcrumbsNav from "./components/BreadCrumbsNavigation";

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await fetchVehicles();
      setVehicles(data);
    };

    loadVehicles();
  }, []);

  return (
    <>
      <Header />
      <BreadcrumbsNav />
      <div style={{ marginTop: "6em" }}>
        <Routes>
          <Route path="/" element={<VehicleList vehicles={vehicles} />} />
          <Route path="/vehicle/:id" element={<VehicleInfo />} />
          <Route path="/vehicle/:id/services" element={<ServiceInfo />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
