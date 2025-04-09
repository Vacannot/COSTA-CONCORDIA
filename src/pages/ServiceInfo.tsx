import { useParams, Link } from "react-router-dom";

const ServiceInfo = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Services for Vehicle {id}</h2>

      <Link to={`/vehicle/${id}`}> Back to Vehicle Info</Link>
    </div>
  );
};

export default ServiceInfo;
