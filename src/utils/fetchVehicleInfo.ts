import { VehicleInformation } from "../types/types";

export async function fetchVehicleInfo(
  id: string
): Promise<VehicleInformation> {
  const cached = localStorage.getItem(`vehicleDetails-${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await fetch(`http://localhost:1337/vehicle/info?id=${id}`);

  if (!res.ok) {
    const errorMessages: Record<number, string> = {
      400: "Bad request (400): Invalid ID",
      401: "Unauthorized (401)",
      404: "Not found (404): Vehicle not found",
    };
    throw new Error(
      errorMessages[res.status] || `Unexpected error: ${res.status}`
    );
  }

  const data: VehicleInformation = await res.json();
  localStorage.setItem(`vehicleDetails-${id}`, JSON.stringify(data));

  return data;
}
