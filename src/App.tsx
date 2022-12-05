import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import ISS from "./components/ISS";
import Bookmarked from "./components/Bookmarked";
import Main from "./components/Main";
import { useEffect } from "react";
import { getForecast, getGridPoints } from "./services/WeatherApiService";
import EventsCalendar from "./components/EventsCalendar";

function App() {
  // let latitude: any;
  // let longitude: any;

  // navigator.geolocation.getCurrentPosition(getLatLon);

  // function getLatLon(position: any) {
  //   latitude = position.coords.latitude;
  //   longitude = position.coords.longitude;
  // }

  // console.log(latitude, longitude);

  useEffect(() => {
    // if (lat && longitude) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(lat);
      console.log(long);
      getGridPoints(lat, long).then((res) => {
        getForecast(res.properties.forecast).then((response) => {
          console.log(response);
        });
      });
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/calendar" element={<EventsCalendar />} />
          <Route path="/iss" element={<ISS />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
