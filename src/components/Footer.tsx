import "./Footer.css";
import WeatherForecast from "./WeatherForecast";

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <WeatherForecast />
        <p>
          Astronomy information provided by{" "}
          <a
            href="https://in-the-sky.org/index.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dominic Ford
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
