import { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import "./App.css";

// Henter nøglen og adresserne fra .env filen
const apiKey = import.meta.env.VITE_API_KEY;
const geoUrl = import.meta.env.VITE_WEATHER_URL;
const weatherUrl = import.meta.env.VITE_WEATHER_DATA_URL;



export default App;