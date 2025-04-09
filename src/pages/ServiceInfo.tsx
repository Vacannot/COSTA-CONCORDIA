import { useParams, Link } from "react-router-dom";
import VehicleServicesList from "../components/VehcileServicesList";
import { VehicleServiceStatus } from "../types/types";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";

type Props = {
  vehicleServices: Record<string, VehicleServiceStatus>;
};

const ServiceInfo: React.FC<Props> = ({ vehicleServices }) => {
  const { id } = useParams();

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (id && !vehicleServices[id]) {
      const timer = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [id, vehicleServices]);

  if (timedOut) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        <div>⏰ Timed out. No ID found.</div>
      </Card>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      {id && vehicleServices[id] ? (
        <VehicleServicesList
          data={vehicleServices[id]}
          vehicleId={id}
          filterActiveOnly={false}
        />
      ) : (
        !timedOut && <p>Loading services...</p>
      )}

      <Link
        to={`/vehicle/${id}`}
        style={{ marginTop: "1rem", display: "inline-block" }}
      >
        ← Back to Vehicle Info
      </Link>
    </div>
  );
};

export default ServiceInfo;
