"use client";

import { useState } from "react";
import WeatherInput from "./components/WeatherInput/WeatherInput";
import WeatherResults from "./components/WeatherResults/WeatherResults";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [prevWeather, setPrevWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchingCity, setSearchingCity] = useState<string | null>(null);

  const hasResults = !!weather || !!error;

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setSearchingCity(city);
    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error fetching weather");
      }
      setPrevWeather(weather);
      setWeather(data);
    } catch (err: any) {
      setWeather(null);
      setError(err.message || "Error fetching weather");
    } finally {
      setLoading(false);
      setSearchingCity(null);
    }
  };

  return (
    <div>
      <main className="flex flex-col justify-center items-center p-4 min-h-screen">
        <div className="flex flex-col items-center w-full">
          <div
            className={`transition-all duration-500 ${
              hasResults ? "-translate-y-16" : "translate-y-0"
            }`}
          >
            <WeatherInput
              onSearch={handleSearch}
              loading={loading}
              resetOnSearch={true}
            />
          </div>
          <div className="relative flex justify-center mt-4 w-full min-h-[260px]">
            <div
              className={`absolute w-full transition-opacity duration-700 ${
                loading && searchingCity
                  ? "opacity-100 pointer-events-none"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ zIndex: 1 }}
            >
              {loading && searchingCity && (
                <div className="flex justify-center mt-4">
                  <div className="loader" />
                </div>
              )}
            </div>
            <div
              className={`w-full transition-opacity duration-700 flex justify-center z-20 ${
                loading ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {(weather || error) && (
                <WeatherResults
                  weather={weather}
                  loading={loading}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer />
    </div>
  );
}
