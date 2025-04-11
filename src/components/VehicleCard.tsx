import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  debounce,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Vehicle } from "../types/types";
import { fetchServices } from "../utils/fetchServices";
import { fetchVehicleInfo } from "../utils/fetchVehicleInfo";

type Props = {
  vehicle: Vehicle;
};

const VehicleCard: React.FC<Props> = ({ vehicle }) => {
  const debouncedServiceFetch = useMemo(
    () => debounce((id: string) => fetchServices(id), 50),
    []
  );

  const debouncedVehicleInfoFetch = useMemo(
    () => debounce((id: string) => fetchVehicleInfo(id), 50),
    []
  );

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 160,
      }}
      onMouseEnter={() => {
        debouncedServiceFetch(vehicle.id);
        debouncedVehicleInfoFetch(vehicle.id);
        localStorage.setItem(`vehicleName-${vehicle.id}`, vehicle.name ?? "");
      }}
    >
      <CardContent>
        <div style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
          <LocalShippingIcon fontSize="large" />

          <div style={{ flexDirection: "column", textAlign: "left" }}>
            <Typography variant="h6" gutterBottom>
              {vehicle.name?.toUpperCase() || "(Unnamed Vehicle)"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ID: {vehicle.id}
            </Typography>
          </div>
        </div>
        <CardActions>
          <Button
            variant="contained"
            size="medium"
            component={Link}
            to={`/vehicle/${vehicle.id}`}
            state={{ vehicle: vehicle }}
            sx={{ maxWidth: "10rem" }}
          >
            Overview
          </Button>

          <Button
            variant="outlined"
            size="medium"
            component={Link}
            to={`/vehicle/${vehicle.id}/services`}
            sx={{ maxWidth: "10rem" }}
          >
            Services
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
