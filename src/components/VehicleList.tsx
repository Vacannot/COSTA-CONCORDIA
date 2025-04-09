import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Vehicle } from "../types/types";
import { Link } from "react-router-dom";

type Props = {
  vehicles: Vehicle[];
  fetchServices: (id: string) => void;
};

const VehicleList: React.FC<Props> = ({ vehicles, fetchServices }) => {
  if (vehicles.length === 0) {
    return <Typography>No vehicles loaded.</Typography>;
  }

  return (
    <Card sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Vehicle List
        </Typography>
      </Box>

      <Box sx={{ gap: 2 }}>
        {vehicles.map((v) => (
          <Card
            sx={{
              height: "100%",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "scale(1.01)",
                boxShadow: 3,
              },
            }}
            onMouseEnter={() => fetchServices(v.id)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {v.name?.toUpperCase() || "(Unnamed Vehicle)"}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID: {v.id}
              </Typography>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to={`/vehicle/${v.id}`}
                  state={{ vehicle: v }}
                  onClick={() =>
                    localStorage.setItem(`vehicleName-${v.id}`, v.name ?? "")
                  }
                >
                  Overview
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/vehicle/${v.id}/services`}
                >
                  Services
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default VehicleList;
