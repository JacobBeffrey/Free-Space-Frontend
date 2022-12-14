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
import { doesNotThrow } from "assert";

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
  const [popUp, setPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

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
  const addEvent = () => {
    console.log(selectedEvent);

    if (selectedEvent && account) {
      const isFav = account?.favorites.some((item) => {
        return item._id === selectedEvent._id;
      });
      console.log(isFav);
      const copyOfAccount = { ...account };
      if (!isFav) {
        copyOfAccount.favorites.push(selectedEvent);
        console.log(copyOfAccount, selectedEvent);
        updateAccount(copyOfAccount).then((res) => {
          setAccount(res);
          setPopUp(false);
        });
      }
    }
  };

  const showPopUp = (calEvent: CalendarEvent) => {
    setPopUp(true);
    setSelectedEvent(calEvent);
  };
  const closePopUp = () => {
    setPopUp(false);
  };
  return (
    <div className="EventsCalendar">
      <Calendar
        localizer={localizer}
        events={calendarJsonInput}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={showPopUp}
      />
      {popUp && selectedEvent && (
        <div className="popUp">
          <div className="elements-container">
            <p className="title">{selectedEvent.title}</p>
            <button className="addEvent-btn" onClick={addEvent}>
              add event
            </button>
            <button className="remove-popup" onClick={closePopUp}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
