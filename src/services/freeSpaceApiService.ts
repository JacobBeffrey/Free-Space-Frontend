import axios from "axios";
import CalendarEvent from "../models/CalendarEvent";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";
export const getAllCalendarEvent = (): Promise<CalendarEvent[]> => {
  return axios.get(`${baseUrl}/free_space`).then((res) => res.data);
};
