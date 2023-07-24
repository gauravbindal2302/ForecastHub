import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUmbrella,
  faList,
  faWind,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "./config.js";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiKey = config.apiKey;
      const unit = "metric";
      const url1 =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        apiKey +
        "&units=" +
        unit;
      const url2 =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=" +
        apiKey +
        "&units=" +
        unit;

      const [response1, response2] = await Promise.all([
        axios.get(url1),
        axios.get(url2),
      ]);

      setWeatherData({
        currentWeatherData: response1.data,
        forecastData: response2.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (dt_txt) => {
    const date = new Date(dt_txt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
    return formattedTime;
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="col-1">
          <FontAwesomeIcon icon={faUmbrella} />
          <ul>
            <li>F</li>
            <li>O</li>
            <li>R</li>
            <li>E</li>
            <li>C</li>
            <li>A</li>
            <li>S</li>
            <li>T</li>
            <li> </li>
            <li>H</li>
            <li>U</li>
            <li>B</li>
          </ul>
        </div>
        <div className="col-2">
          <div className="row-1">
            <form onSubmit={handleSubmit}>
              <input
                type="name"
                placeholder="Search for city"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <button className="search-icon" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
          <div className="row-2">
            {weatherData && weatherData.currentWeatherData && (
              <div className="row-2-col-1">
                <div className="row-2-col-1-row-1">
                  <h1>{weatherData.currentWeatherData.name}</h1>
                  <p>{weatherData.currentWeatherData.weather[0].description}</p>
                </div>
                <div className="row-2-col-1-row-2">
                  <span>
                    {Math.round(weatherData.currentWeatherData.main.temp)}°
                  </span>
                </div>
              </div>
            )}
            {weatherData && weatherData.currentWeatherData && (
              <div className="row-2-col-2">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.currentWeatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
            )}
          </div>

          <div className="row-3">
            <div className="row-3-header">
              <h1>Today's Forecast</h1>
              <label>
                {currentDate} - {getCurrentTime()}
              </label>
            </div>
            <div className="carousel">
              {weatherData && weatherData.forecastData && (
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false} // Hide the arrow buttons
                  showIndicators={false} // Hide the dots
                  infiniteLoop={false}
                  centerMode={true}
                  centerSlidePercentage={100 / 8}
                  selectedItem={currentSlide}
                  onChange={handleSlideChange}
                >
                  {weatherData.forecastData.list.slice(5, 13).map((item) => (
                    <div className="hourly-col" key={item.dt}>
                      <p>{formatTime(item.dt_txt)}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                      />
                      <span>{Math.round(item.main.temp)}°</span>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>

          <div className="row-4">
            <div className="row-4-container">
              <div className="main-col">
                <h1>
                  <FontAwesomeIcon icon={faList} /> Main
                </h1>
                <div className="main-row-1">
                  <div className="main-col-1">
                    <label>Pressure:</label>
                    <br />
                    {weatherData && weatherData.currentWeatherData && (
                      <span>
                        {weatherData.currentWeatherData.main.pressure}mb
                      </span>
                    )}
                  </div>
                  <div className="main-col-2">
                    <label>Sea Level:</label>
                    <br />
                    {weatherData && weatherData.currentWeatherData && (
                      <span>
                        {weatherData.currentWeatherData.main.sea_level}
                      </span>
                    )}
                  </div>
                </div>
                <div className="main-row-2">
                  <div className="main-col-3">
                    <label>
                      <FontAwesomeIcon icon="fa-sharp fa-solid fa-droplet-percent" />{" "}
                      Humidity:
                    </label>
                    <br />{" "}
                    {weatherData && weatherData.currentWeatherData && (
                      <span>
                        {weatherData.currentWeatherData.main.humidity}%
                      </span>
                    )}
                  </div>
                  <div className="main-col-4">
                    <label>Ground Level:</label>
                    <br />{" "}
                    {weatherData && weatherData.currentWeatherData && (
                      <span>
                        {weatherData.currentWeatherData.main.grnd_level}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="wind-col">
                <h1>
                  <FontAwesomeIcon icon={faWind} /> Wind
                </h1>
                <div className="wind-row-1">
                  <label>Speed:</label>
                  <br />{" "}
                  {weatherData && weatherData.currentWeatherData && (
                    <span>
                      {weatherData.currentWeatherData.wind.speed * 10} km/h
                    </span>
                  )}
                </div>
                <div className="wind-row-2">
                  <label>Gust:</label>
                  <br />{" "}
                  {weatherData && weatherData.currentWeatherData && (
                    <span>{weatherData.currentWeatherData.wind.gust}</span>
                  )}
                </div>
              </div>
              <div className="sun-col">
                <h1>
                  <FontAwesomeIcon icon={faSun} /> Sun
                </h1>
                <div className="sun-row-1">
                  <label>Sunrise:</label>
                  <br />{" "}
                  {weatherData && weatherData.currentWeatherData && (
                    <span>
                      {formatTimestampToTime(
                        weatherData.currentWeatherData.sys.sunrise
                      )}
                    </span>
                  )}
                </div>
                <div className="sun-row-2">
                  <label>Sunset:</label>
                  <br />{" "}
                  {weatherData && weatherData.currentWeatherData && (
                    <span>
                      {formatTimestampToTime(
                        weatherData.currentWeatherData.sys.sunset
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="col-3-container">
            <div className="col-3-header">
              <h1>7-Day Forecast</h1>
            </div>
            <table className="forecast-table">
              {" "}
              {weatherData && weatherData.forecastData && (
                <tbody>
                  {weatherData.forecastData.list
                    .slice(0, 7)
                    .map((item, index) => (
                      <tr className="forecast-row" key={item.dt}>
                        <td className="day">
                          {index === 0
                            ? formatDate(new Date()).slice(0, 3)
                            : formatDate(
                                new Date(
                                  Date.now() + index * 24 * 60 * 60 * 1000
                                )
                              ).slice(0, 3)}
                        </td>
                        <td className="image">
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                          />
                        </td>
                        <td className="status">{item.weather[0].main}</td>
                        <td className="temp_max">
                          {Math.round(item.main.temp_max)}°
                        </td>
                        <td className="temp_min">
                          {Math.round(item.main.temp_min)}°
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
