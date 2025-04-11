import { useParams } from "react-router-dom";
import VehicleServicesList from "../components/VehcileServicesList";

const ServiceInfo: React.FC = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      {id ? (
        <VehicleServicesList vehicleId={id} filterActiveOnly={false} />
      ) : (
        <p>Loading services...</p>
      )}
    </div>
  );
};

export default ServiceInfo;
