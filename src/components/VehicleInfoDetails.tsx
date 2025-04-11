import {
  Card,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useState, useEffect } from "react";
import { VehicleInformation } from "../types/types";
import { fetchVehicleInfo } from "../utils/fetchVehicleInfo";
import { useParams } from "react-router";

const VehicleInfoDetails: React.FC = () => {
  const { id } = useParams();

  const [vehicleInformation, setVehicleInformation] =
    useState<VehicleInformation | null>(null);

  const [vehicleName, setVehicleName] = useState<string | null>(null);

  const [vehicleInfoErrorMsg, setVehicleInfoErrorMsg] = useState<string | null>(
    null
  );

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!id) return;

    const storedName = localStorage.getItem(`vehicleName-${id}`);
    if (storedName) setVehicleName(storedName);

    let didCancel = false;

    const timeout = setTimeout(() => {
      if (!didCancel) {
        setTimedOut(true);
      }
    }, 5000);

    const fetchInfo = async () => {
      try {
        const data = await fetchVehicleInfo(id);
        if (!didCancel) {
          clearTimeout(timeout);
          setVehicleInformation(data);
        }
      } catch (error: unknown) {
        if (!didCancel) {
          clearTimeout(timeout);
          setTimedOut(false);
          setVehicleInfoErrorMsg(
            error instanceof Error
              ? error.message
              : "An unkown error occurred 😭😞"
          );
        }
      }
    };

    fetchInfo();

    return () => {
      didCancel = true;
      clearTimeout(timeout);
    };
  }, [id]);

  if (vehicleInfoErrorMsg) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <h2>Vehicle Details</h2>
        <Card sx={{ padding: 3 }}>
          <p style={{ color: "red" }}>{vehicleInfoErrorMsg}</p>
        </Card>
      </Card>
    );
  }

  if (timedOut) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        ⏰ Timed out. Could not load vehicle information.
      </Card>
    );
  }

  if (!vehicleInformation) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        Loading Vehcile information...
      </Card>
    );
  }

  return (
    <Card
      sx={{
        padding: 4,
        minWidth: 300,
        maxWidth: 400,
        textAlign: "middle",
        flex: 1,
        alignSelf: "flex-start",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <Typography variant="h6" gutterBottom>
          {(vehicleName ?? "Unnamed Vehicle").toUpperCase()}
        </Typography>
        <Typography color="grey">{id || "Missing ID"}</Typography>
      </div>
      <Card>
        <TableContainer>
          <Table size="small">
            <TableBody>
              {Object.entries(vehicleInformation).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {key.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell>{String(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Card>
  );
};

export default VehicleInfoDetails;
