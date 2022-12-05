import CalendarEvent from "../models/CalendarEvent";
import { getAllCalendarEvent } from "../services/CalendarEventsApiService";
import "./EventsCalendar.css";

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventsCalendar = () => {
  const [calendarInfo, setCalendarInfo] = useState<CalendarEvent[]>();

  useEffect(() => {
    getAllCalendarEvent().then((res) => console.log(res));
  }, []);
  return (
    <div className="EventsCalendar">
      <Calendar
        localizer={localizer}
        events={calendarInfo}
        startAccessor="dtstart"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default EventsCalendar;
