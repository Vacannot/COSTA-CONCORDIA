export type Vehicle = {
  id: string;
  name?: string;
};

export type VehicleInformation = {
  id: string;
  msidn: string;
  engineStatus: engineStatus;
  fleet: string;
  brand: number;
  countryOfOperation: string;
  chassiNumber: string;
  cassiSeries: string;
};

export enum engineStatus {
  Ok = "OK",
  Danger = "DANGER",
}

export type VehicleServiceStatus = {
  communicationStatus: CommunicationStatus;
  services: Service[];
};

export enum CommunicationStatus {
  Active = "ACTIVE",
  Deactivated = "DEACTIVATED",
  Unknown = "UNKNOWN",
  Error = "ERROR",
}

export interface Service {
  serviceName: string;
  status: ServiceStatus;
  lastUpdate: string;
  reason?: string;
}
export enum ServiceStatus {
  Active = "ACTIVE",
  Deactivated = "DEACTIVATED",
  Error = "ERROR",
}
