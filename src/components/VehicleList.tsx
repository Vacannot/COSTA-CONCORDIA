import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Vehicle } from "../types/types";
import VehicleCard from "./VehicleCard";

type Props = {
  vehicles: Vehicle[];
};

const VehicleList: React.FC<Props> = ({ vehicles }) => {
  if (vehicles.length === 0) {
    return (
      <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
        <h2>womp womp 😭😭😭😭</h2>
        <Card sx={{ padding: 3 }}>
          <p style={{ color: "red" }}>Can't connect to API server</p>
        </Card>
      </Card>
    );
  }

  return (
    <Card sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontFamily: "VolvoNovumMedium" }}
        >
          Vehicle List
        </Typography>
      </Box>

      <Box
        sx={{
          gap: 2,
          maxHeight: 800,
          overflow: "hidden",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </Box>
    </Card>
  );
};

export default VehicleList;
