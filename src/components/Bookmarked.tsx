import { useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import AuthContext, { AuthContextModel } from "../context/AuthContext";
import AccountInfo from "../models/AccountInfo";
import CalendarEvent from "../models/CalendarEvent";
import { updateAccount } from "../services/AccountInfoApiService";
import { getAllCalendarEvent } from "../services/CalendarEventsApiService";
import "./Bookmarked.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const Bookmarked = () => {
  const [calendarJsonInput, setCalendarJsonInput] = useState<CalendarEvent[]>();

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
    setCalendarJsonInput(() => {
      if (account) {
        const updatedArray = [...account?.favorites];
        console.log(updatedArray);
        updatedArray.forEach((item) => {
          // let xStart = item.start.toString();
          // let xEnd = item.end.toString();
          item.start = new Date(item.start);
          item.end = new Date(item.end);
        });
        console.log(updatedArray);
        return updatedArray;
      }
    });

    //console.log(res));
  }, [account]);

  console.log(account?.favorites);
  // calendarJsonInput?.map((event) => {});
  // -------------------------------------------------change any
  // const addEvent = (e: any) => {
  //   if (e && account) {
  //     copyOfAccount = { ...account };
  //     copyOfAccount.favorites.push(e);
  //     console.log(copyOfAccount);
  //     updateAccount(copyOfAccount).then((res) => {
  //       setAccount(res);
  //     });
  //     console.dir(e);
  //   }
  // };

  return (
    <div className="BookMarked">
      <Calendar
        localizer={localizer}
        events={calendarJsonInput}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, backgroundColor: "white" }}
        // onSelectEvent={addEvent}
      />
    </div>
  );
};
export default Bookmarked;
