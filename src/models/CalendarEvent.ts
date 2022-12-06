export default interface CalendarEvent {
  _id?: string;
  start: Date;
  title: string;
  description: string;
  url: string;
  end: Date;
}
