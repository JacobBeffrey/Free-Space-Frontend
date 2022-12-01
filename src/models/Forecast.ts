// import Gridpoints from "./Weather";
interface Period {
  name: string;
  startTime: string;
  endTime: string;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  icon: string;
  shortForecast?: string;
  detailedForecast?: string;
}
interface Properties {
  periods: Period[];
}
export default interface Forecast {
  properties: Properties;
}
