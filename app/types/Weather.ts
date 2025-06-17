export type Weather = {
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
};

export type WeatherError = {
  error: string;
};

export type WeatherApiResponse = Weather | WeatherError;
