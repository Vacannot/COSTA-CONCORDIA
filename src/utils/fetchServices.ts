import { VehicleServiceStatus } from "../types/types";

export const fetchServices = async (
  id: string
): Promise<VehicleServiceStatus> => {
  const cached = localStorage.getItem(`services-${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await fetch(`http://localhost:1337/vehicle/services?id=${id}`);

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

  const data: VehicleServiceStatus = await res.json();
  localStorage.setItem(`services-${id}`, JSON.stringify(data));
  return data;
};
