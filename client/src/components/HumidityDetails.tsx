import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useWeather } from "./WeatherContext";

export default function HumidityDetails() {
  const { weatherDays } = useWeather();

  if (!weatherDays) {
    return <div>Loading...</div>;
  }

  const humidityDay = weatherDays.slice(0, 9).map((hour) => ({
    date: hour.dt_txt,
    humidity: Math.round(hour.main.humidity),
    temp: Math.round(hour.main.temp),
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={600}
        height={300}
        data={humidityDay}
        margin={{
          top: 25,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="2 10" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
            })
          }
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          formatter={(value, data) => {
            if (data === "humidity") {
              return [`${value} %`, "Humidité"];
            }
            if (data === "temp") {
              return [`${value} °C`, "Température"];
            }
            return value;
          }}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
          contentStyle={{
            backgroundColor: "#333",
            borderColor: "#333",
            color: "#fff",
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="humidity"
          stroke="#0047AB"
        />
        <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#2F4F4F" />
      </LineChart>
    </ResponsiveContainer>
  );
}
