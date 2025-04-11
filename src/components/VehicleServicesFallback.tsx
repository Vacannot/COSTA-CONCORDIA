import { Card, Typography } from "@mui/material";
import { CommunicationStatus } from "../types/types";

type Props = {
  errorMsg?: string | null;
  timedOut?: boolean;
  isLoading?: boolean;
  communicationStatus?: CommunicationStatus;
  vehicleId?: string;
};

const VehicleServicesFallback: React.FC<Props> = ({
  errorMsg,
  timedOut,
  isLoading,
  communicationStatus,
  vehicleId,
}) => {
  let content: React.ReactNode = null;

  if (errorMsg) {
    content = <Typography color="error">{errorMsg}</Typography>;
  } else if (timedOut) {
    content = <>⏰ Timed out. Could not load services.</>;
  } else if (isLoading) {
    content = <>Loading services...</>;
  } else if (communicationStatus === CommunicationStatus.Deactivated) {
    content = (
      <>Communication Status for this vehicle's services is Deactivated</>
    );
  } else if (communicationStatus === CommunicationStatus.Unknown) {
    content = <>Communication Status for this vehicle's services is Unknown</>;
  } else if (!vehicleId) {
    content = <>🚫 No vehicle ID provided.</>;
  }

  if (!content) return null;

  return (
    <Card sx={{ padding: 3, flex: 2, minWidth: 300, maxWidth: 400 }}>
      <h2>Services</h2>
      <Card sx={{ padding: 3 }}>{content}</Card>
    </Card>
  );
};

export default VehicleServicesFallback;
