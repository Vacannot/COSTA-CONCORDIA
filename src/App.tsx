import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  type Vehicle = {
    id: string;
    name?: string; // name is optional because one item in your list doesn't have it
  };

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

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ padding: "1rem" }}>
        <button onClick={fetchVehicles}>Load Vehicles</button>

        <div style={{ marginTop: "1rem" }}>
          {vehicles.length === 0 && <p>No vehicles loaded.</p>}
          <ul>
            {vehicles.map((v) => (
              <li key={v.id}>
                {v.name || "(Unnamed Vehicle)"} — {v.id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
