interface cityDataTypes {
  lon: number;
  lat: number;
}

interface weatherDataTypes {
  name?: string;
  weather: [
    {
      description: string;
    },
  ];
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
}

interface propsTypes {
  city: string;
  setCity: (city: string) => void;
  handleFetchData: () => void;
  weatherData: weatherDataTypes;
  weatherDays: weatherDaysTypes[];
  cityData: cityDataTypes[];
}

interface cityDataTypes {
  lat: string;
  lon: string;
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

type MapPosition = [number, number];
type MoveMapProps = {
  position: MapPosition;
};
