interface cityDataTypes {
  lon: number;
  lat: number;
}

interface weatherDataTypes {
  name?: string;
  weather: [
    {
      description: string;
      icon: string;
      main: string;
    },
  ];
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
}

interface propsTypes {
  city: string;
  setCity: (city: string) => void;
  handleFetchData: () => void;
  weatherData: weatherDataTypes;
  setWeatherData: (data: weatherDataTypes) => void;
  weatherDays: weatherDaysTypes[];
  setWeatherDays: (data: weatherDaysTypes[]) => void;
  name: string;
  setName: (name: string) => void;
  cityData: cityDataTypes[];
}

interface WeatherproviderType {
  children: ReactNode;
}

interface WeatherIcon {
  id: number;
  icon: string;
}
interface WeatherDay {
  dt_txt: string;
  weather: WeatherIcon[];
  main: {
    temp: number;
  };
}
interface WeatherTypes {
  weatherData: {
    name: string;
  };
  weatherDays: WeatherDay[];
}

interface DayTypes {
  day: {
    dt_txt: string;
    weather: {
      icon: string;
    }[];
    main: {
      temp: number;
    };
  };
}

interface WeatherDay {
  date: string;
  temp: number;
  humidity: number;
  description: string;
  windSpeed: number;
  temp_min: number;
  temp_max: number;
}

interface FavoritesTypes {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}
