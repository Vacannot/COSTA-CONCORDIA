import { Card } from "@mui/material";
import { CommunicationStatus, VehicleServiceStatus } from "../types/types";
import { useEffect, useState } from "react";

type Props = {
  data?: VehicleServiceStatus;
  vehicleId?: string;
  filterActiveOnly?: boolean;
};

const VehicleServicesList: React.FC<Props> = ({
  data,
  filterActiveOnly = false,
}) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!data) {
      const timer = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  if (timedOut) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        <div>⏰ Timed out. Could not load services.</div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        <div>Loading services...</div>
      </Card>
    );
  }

  if (data.communicationStatus === CommunicationStatus.Deactivated) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        <div>
          Communication Status for this vehicle's services is Deactivated
        </div>
      </Card>
    );
  }

  if (data.communicationStatus === CommunicationStatus.Unknown) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
        <div>Communication Status for this vehicles services is Unknown</div>
      </Card>
    );
  }

  const services = filterActiveOnly
    ? data?.services.filter((s) => s.status === "ACTIVE")
    : data?.services ?? [];

  return (
    <Card sx={{ padding: 3, flex: 2, minWidth: 300 }}>
      <h2>Services</h2>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Communication Status:</strong>{" "}
        {data?.communicationStatus || "Unavailable"}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {services?.map((service) => (
          <Card
            sx={{
              padding: 2,
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              height: "100%",
              width: "100%",
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <div>
              <strong>Service:</strong> {service.serviceName}
            </div>
            <div>
              <strong>Status:</strong> {service.status}
            </div>
            <div>
              <strong>Last Update:</strong>{" "}
              {new Date(service.lastUpdate).toLocaleString()}
            </div>
            {service.reason && (
              <div>
                <strong>Reason:</strong> {service.reason}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default VehicleServicesList;
