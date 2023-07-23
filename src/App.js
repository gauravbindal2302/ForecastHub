import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="app-row">
        <div className="app-col-1">
          <FontAwesomeIcon id="icon" icon={faUmbrella} />
        </div>
        <div className="app-col-2">
          <div>
            <div id="content">
              <FontAwesomeIcon id="content-icon" icon={faUmbrella} />
              <h1>ForecastHub</h1>
              <p>Weather App</p>
            </div>
            <div className="get-started">
              <Link to="/forecast">
                <button type="submit">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
