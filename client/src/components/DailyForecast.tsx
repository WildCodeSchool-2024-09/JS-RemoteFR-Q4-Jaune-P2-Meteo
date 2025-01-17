import { useWeather } from "./WeatherContext";
import "../styles/DailyForecast.css";
import { useState } from "react";

export default function DailyForecast() {
  const { weatherDays } = useWeather();

  const dailyWeather = weatherDays
    .filter((day) => new Date(day.dt_txt).getHours() === 12)
    .map((day) => ({
      date: new Date(day.dt_txt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
      temp: Math.round(day.main.temp),
      humidity: day.main.humidity,
      description: day.weather[0].description,
      windSpeed: day.wind.speed,
      temp_min: Math.round(day.main.temp_min),
      temp_max: Math.round(day.main.temp_max),
    }));

  const [selectedDay, setSelectedDay] = useState(dailyWeather[0]);

  const handleDayClick = (day: WeatherDay) => {
    setSelectedDay(day);
  };

  return (
    <article>
      <div className="main-info">
        <div className="left-side">
          <p className="desc">{selectedDay.description}</p>
          <p className="temp">{selectedDay.temp}°C</p>
          <p className="min-max">
            {selectedDay.temp_min}°C / {selectedDay.temp_max}°C
          </p>
        </div>
        <div className="right-side">
          <p className="time">{selectedDay.date}</p>
          <p>Humidity: {selectedDay.humidity}%</p>
          <p>Wind: {selectedDay.windSpeed} km/h</p>
        </div>
      </div>
      <div className="day-list">
        {dailyWeather.map((day) => (
          <button
            type="button"
            key={day.date}
            onClick={() => handleDayClick(day as WeatherDay)}
          >
            {day.date}
          </button>
        ))}
      </div>
    </article>
  );
}

/* {dailyWeather.map((day) => (
        <DailyCard key={day.date} day={day} />
      ))} */
