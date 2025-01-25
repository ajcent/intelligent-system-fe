import apiClient from "./apiClient";

export type ApplianceAdjustments = {
  aircon: number;
  fan: 1 | 2 | 3;
  ventilation: boolean;
  humidifier: boolean;
  dehumidifier: boolean;
  heater: boolean;
};

interface Response {
  data: ApplianceAdjustments;
  status: number;
  statusText: string;
}

export const getCrispValue = async (): Promise<Response> => {
  return await apiClient.get("");
};
