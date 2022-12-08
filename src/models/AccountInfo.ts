import CalendarEvent from "./CalendarEvent";

export default interface AccountInfo {
  userName: string;
  email: string;
  loggedIn: boolean;
  _id?: string;
  uid: string;
  favorites: CalendarEvent[];
}
