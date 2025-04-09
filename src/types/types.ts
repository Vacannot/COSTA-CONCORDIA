export type Vehicle = {
  id: string;
  name?: string;
};

export type VehicleInformation = {
  id: string;
  msidn: string;
  engineStatus: "OK" | "DANGER";
  fleet: string;
  brand: number;
  countryOfOperation: string;
  chassiNumber: string;
  cassiSeries: string;
};

export type VehicleServiceStatus = {
  communicationStatus: "ACTIVE" | "INACTIVE";
  services: Service[];
};

export type Service = {
  serviceName: string;
  status: "ACTIVE" | "DEACTIVATED" | "ERROR";
  lastUpdate: string;
  reason?: string;
};
