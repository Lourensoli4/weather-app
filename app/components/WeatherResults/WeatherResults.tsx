import Image from "next/image";
import getRoundedNumber from "../../utils/getRoundedNumber";
import { Weather } from "@/app/types/Weather";

type WeatherResultsProps = {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
};

const WeatherResults: React.FC<WeatherResultsProps> = ({
  weather,
  loading,
  error,
}) => {
  return (
    <div className="flex flex-col items-center w-full weather-results">
      {error && (
        <div className="mt-2 text-black">
          <h3>{error}</h3>
        </div>
      )}
      {!loading && !error && weather && (
        <div className="flex flex-col items-center">
          <h3>{weather.name}</h3>
          <div className="flex items-center mt-4">
            <div>
              {weather.weather[0].icon && (
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width={120}
                  height={120}
                />
              )}
            </div>
            <div className="ml-4">
              <div>
                <strong>Current:</strong> {getRoundedNumber(weather.main.temp)}
                °C, {weather.weather[0].main}
              </div>
              <div>
                <strong>Description:</strong> {weather.weather[0].description}
              </div>
              <div>
                <strong>Feels like:</strong>{" "}
                {getRoundedNumber(weather.main.feels_like)}°C
              </div>
              <div>
                <strong>Humidity:</strong> {weather.main.humidity}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherResults;
