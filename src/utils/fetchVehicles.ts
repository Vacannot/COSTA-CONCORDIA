import { Vehicle } from "../types/types";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const cached = localStorage.getItem("vehicles");
    if (cached) {
      return JSON.parse(cached);
    }

    const res = await fetch("http://localhost:1337/vehicle/list");

    if (!res.ok) {
      const errorMessages: Record<number, string> = {
        401: "Unauthorized (401)",
      };
      throw new Error(
        errorMessages[res.status] || `Unexpected error: ${res.status}`
      );
    }

    const data = await res.json();

    localStorage.setItem("vehicles", JSON.stringify(data.vehicles));

    return data.vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};
