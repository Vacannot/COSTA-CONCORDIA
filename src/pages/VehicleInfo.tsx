import { useParams } from "react-router-dom";
import VehicleServicesList from "../components/VehcileServicesList";
import VehicleInfoDetails from "../components/VehicleInfoDetails";

const VehicleInfo: React.FC = () => {
  const { id } = useParams();

  return (
    <div style={{ marginTop: 50 }}>
      <h1 style={{ fontFamily: "VolvoNovumMedium" }}>Vehicle Information</h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <VehicleInfoDetails />
        <VehicleServicesList vehicleId={id!} filterActiveOnly={true} />
      </div>
    </div>
  );
};

export default VehicleInfo;
