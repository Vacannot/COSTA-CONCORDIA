import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { VehicleInformation, VehicleServiceStatus } from "../types/types";
import { Card } from "@mui/material";
import VehicleServicesList from "../components/VehcileServicesList";

type Props = {
  vehicleServices: Record<string, VehicleServiceStatus>;
  fetchServices: (id: string) => void;
};

const VehicleInfo: React.FC<Props> = ({ vehicleServices }) => {
  const { id } = useParams();
  const location = useLocation();
  const { vehicle } = location.state || {};

  const [vehicleInformation, setVehicleInformation] =
    useState<VehicleInformation | null>(null);

  const [vehicleName, setVehicleName] = useState<string | null>(
    vehicle?.name || null
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /*   const [timedOut, setTimedOut] = useState(false);
   */
  useEffect(() => {
    if (!vehicleName && id) {
      const storedName = localStorage.getItem(`vehicleName-${id}`);
      if (storedName) {
        setVehicleName(storedName);
      }
    }
    const fetchInfo = async () => {
      try {
        const res = await fetch(`http://localhost:1337/vehicle/info?id=${id}`);

        if (!res.ok) {
          switch (res.status) {
            case 400:
              throw new Error("Bad request (400): Invalid ID");
            case 401:
              throw new Error("Unauthorized (401)");
            case 404:
              throw new Error("Not found (404): Vehicle not found");
            default:
              throw new Error(`Unexpected error: ${res.status}`);
          }
        }

        const data = await res.json();
        console.log(data);
        setVehicleInformation(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("An unknown error occurred.");
        }
      }
    };

    if (id) {
      fetchInfo();
    }
  }, [id, vehicleName]);

  if (errorMsg) {
    return (
      <Card sx={{ padding: 3, marginTop: 2 }}>
        <p style={{ color: "red" }}>{errorMsg}</p>
      </Card>
    );
  }

  /*   if (timedOut) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        ⏰ Timed out. Could not load vehicle information.
      </Card>
    );
  } */

  if (!vehicleInformation) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        Loading Vehcile information...
      </Card>
    );
  }

  return (
    <>
      <h1 style={{ fontFamily: "VolvoNovumMedium" }}>
        {vehicleName?.toUpperCase() || "Unnamed Vehicle"}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <Card sx={{ padding: 3, flex: 1, minWidth: 300, textAlign: "left" }}>
          <h2>Vehicle Details</h2>
          {Object.entries(vehicleInformation).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "0.5rem" }}>
              <strong style={{ textTransform: "capitalize" }}>
                {key.replace(/_/g, " ")}:
              </strong>
              {String(value)}
            </div>
          ))}
        </Card>
        {vehicleServices[id!] && vehicleServices[id!].services && (
          <VehicleServicesList
            data={vehicleServices[id!]}
            vehicleId={id!}
            filterActiveOnly={true}
          />
        )}
      </div>
    </>
  );
};

export default VehicleInfo;
