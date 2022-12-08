import CalendarEvent from "../models/CalendarEvent";
import { getAllCalendarEvent } from "../services/CalendarEventsApiService";
import "./EventsCalendar.css";

import { useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import DisplayEventInfo from "../models/DisplayEventInfo";
import { updateAccount } from "../services/AccountInfoApiService";
import AuthContext from "../context/AuthContext";

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
  const [calendarJsonInput, setCalendarJsonInput] = useState<CalendarEvent[]>();
  const [calendarInfo, setCalendarInfo] = useState<DisplayEventInfo[]>();
  const { account, setAccount } = useContext(AuthContext);

  const dateMod = (date: string) => {
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);
    let hours = date.slice(9, 11);
    let minutes = date.slice(11, 13);
    let seconds = date.slice(13, 15);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    getAllCalendarEvent().then((res) =>
      setCalendarJsonInput(() => {
        const updatedArray = [...res];
        updatedArray.forEach((item) => {
          let xStart = item.start.toString();
          let xEnd = item.end.toString();
          item.start = new Date(dateMod(xStart));
          item.end = new Date(dateMod(xEnd));
        });
        console.log(updatedArray);
        return updatedArray;
      })
    );
    //console.log(res));
  }, []);

  console.log(calendarJsonInput);
  // calendarJsonInput?.map((event) => {});
  // -------------------------------------------------change any
  const addEvent = (e: any) => {
    console.dir(e);

    if (e && account) {
      const copyOfAccount = { ...account };
      copyOfAccount.favorites.push(e);
      console.log(copyOfAccount);

      updateAccount(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };
  return (
    <div className="EventsCalendar">
      <Calendar
        localizer={localizer}
        events={calendarJsonInput}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={addEvent}
      />
    </div>
  );
};

export default EventsCalendar;
