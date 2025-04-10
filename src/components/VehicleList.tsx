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
          width: 600,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {vehicles.map((v) => (
          <Card
            sx={{
              height: "100%",
              minHeight: 200,
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

              <Stack direction="column" spacing={1} mt={2}>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to={`/vehicle/${v.id}`}
                  state={{ vehicle: v }}
                  onClick={() =>
                    localStorage.setItem(`vehicleName-${v.id}`, v.name ?? "")
                  }
                  sx={{ maxWidth: "10rem" }}
                >
                  Overview
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/vehicle/${v.id}/services`}
                  sx={{ maxWidth: "10rem" }}
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
