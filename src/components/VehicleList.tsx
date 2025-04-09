import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import { Vehicle } from "../types/types";
import { Link } from "react-router-dom";

type Props = {
  vehicles: Vehicle[];
  onRefresh: () => void;
};

const VehicleList: React.FC<Props> = ({ vehicles, onRefresh }) => {
  if (vehicles.length === 0) {
    return <p>No vehicles loaded.</p>;
  }

  return (
    <Card sx={{ padding: 5, backgroundColor: "lightgray" }}>
      <Button variant="contained" onClick={() => onRefresh()}>
        Refresh Vehicles
      </Button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {vehicles.map((v) => (
          <Link
            key={v.id}
            to={`/vehicle/${v.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                marginBottom: 2,
                padding: 1,
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#aaaaaa",
                },
              }}
            >
              <CardContent>
                {v.name || "(Unnamed Vehicle)"} — {v.id}
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </Card>
  );
};

export default VehicleList;
