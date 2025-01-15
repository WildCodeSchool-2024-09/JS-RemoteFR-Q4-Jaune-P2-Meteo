import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";
import "../styles/WeekTemp.css";
import { useWeather } from "./WeatherContext";

export default function WeekTemp() {
  const { weatherDays } = useWeather();

  if (!weatherDays) {
    return <div>Loading...</div>;
  }

  // Filtrer les données pour obtenir une valeur par jour à midi (12:00)
  const dailyWeather = weatherDays
    .filter((day) => new Date(day.dt_txt).getHours() === 12)
    .map((day) => ({
      date: day.dt_txt,
      temp: Math.round(day.main.temp), // Arrondir la température
    }));

  return (
    <div className="week-temp">
      <h2>Température de la semaine</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={dailyWeather}
          margin={{ top: 30, right: 5, left: -15, bottom: 50 }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })
            }
            stroke="#fff"
            tick={{ fill: "#fff" }}
          />
          <YAxis domain={[0, "auto"]} stroke="#fff" tick={{ fill: "#fff" }} />
          <Tooltip
            formatter={(value) => [`${value} °C`, "Température"]}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            }
            contentStyle={{
              backgroundColor: "#333",
              borderColor: "#333",
              color: "#fff",
            }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="temp" fill="#FFA500" barSize={40}>
            <LabelList
              dataKey="temp"
              position="top"
              fill="#fff"
              formatter={(value: number) => `${value}°C`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
