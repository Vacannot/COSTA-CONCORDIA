import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CommunicationStatus, VehicleServiceStatus } from "../types/types";
import { fetchServices } from "../utils/fetchServices";

type Props = {
  vehicleId?: string;
  filterActiveOnly?: boolean;
};

const VehicleServicesList: React.FC<Props> = ({
  vehicleId,
  filterActiveOnly = false,
}) => {
  const [data, setData] = useState<VehicleServiceStatus | undefined>();
  const [timedOut, setTimedOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let didTimeout = false;

    if (!data && vehicleId) {
      const timeout = setTimeout(() => {
        if (!data && !errorMsg) {
          didTimeout = true;
          setTimedOut(true);
        }
      }, 10000);

      const load = async () => {
        try {
          const serviceData = await fetchServices(vehicleId);
          if (!didTimeout) {
            setData(serviceData);
          }
        } catch (error) {
          if (!didTimeout) {
            if (error instanceof Error) {
              setErrorMsg(error.message);
            } else {
              setErrorMsg("An unknown error occurred.");
            }
          }
        } finally {
          clearTimeout(timeout);
        }
      };

      load();
    }
  }, [vehicleId, data, errorMsg]);

  if (errorMsg) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <h2>Services</h2>
        <Card sx={{ padding: 3 }}>
          <p style={{ color: "red" }}>{errorMsg}</p>
        </Card>
      </Card>
    );
  }

  if (timedOut) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <div>⏰ Timed out. Could not load services.</div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <div>Loading services...</div>
      </Card>
    );
  }

  if (data.communicationStatus === CommunicationStatus.Deactivated) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <div>
          Communication Status for this vehicle's services is Deactivated
        </div>
      </Card>
    );
  }

  if (data.communicationStatus === CommunicationStatus.Unknown) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <div>Communication Status for this vehicles services is Unknown</div>
      </Card>
    );
  }

  if (!vehicleId) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <div>🚫 No vehicle ID provided.</div>
      </Card>
    );
  }

  const services = filterActiveOnly
    ? data?.services.filter((s) => s.status === "ACTIVE")
    : data?.services ?? [];

  return (
    <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
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
            key={service.serviceName}
            sx={{
              padding: 2,
              textAlign: "left",
              height: "100%",
              width: "100%",
            }}
          >
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {Object.entries(service).map(([key, value]) => {
                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/_/g, " ")
                      .replace(/^./, (s) => s.toUpperCase());

                    const displayValue =
                      key === "lastUpdate"
                        ? new Date(value as string).toLocaleString()
                        : String(value)
                            .replace(/[_-]/g, " ")
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .split(" ")
                            .map((word) => {
                              if (word.length <= 3) {
                                return word.toUpperCase();
                              }
                              return (
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                              );
                            })
                            .join(" ");

                    return (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {label}
                        </TableCell>
                        <TableCell>{displayValue}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default VehicleServicesList;
