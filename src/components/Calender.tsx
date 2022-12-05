import { useEffect, useState } from "react";
import CalendarEvent from "../models/CalendarEvent";
import { getAllCalendarEvent } from "../services/CalendarEventsApiService";
import "./Calendar.css";

const Calendar = () => {
  const [calendarInfo, setCalendarInfo] = useState<CalendarEvent[]>();

  useEffect(() => {
    getAllCalendarEvent().then((res) => console.log(res));
  }, []);
  return <div className="Calendar"></div>;
};

export default Calendar;
