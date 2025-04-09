import { useParams, Link } from "react-router-dom";

const VehicleInfo = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Vehicle Info</h2>
      <p>Vehicle ID: {id}</p>

      <Link to={`/vehicle/${id}/services`}>View Services</Link>
    </div>
  );
};

export default VehicleInfo;
