import { createContext } from "react";

import type { WeatherDataTypes } from "../App";

interface WeatherContextType {
  weatherData: WeatherDataTypes;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export default WeatherContext;
