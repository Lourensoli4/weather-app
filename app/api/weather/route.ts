import { NextRequest, NextResponse } from "next/server";
import { Weather, WeatherError, WeatherApiResponse } from "../../types/Weather";

export async function POST(req: NextRequest): Promise<NextResponse<WeatherApiResponse>> {
  const { city } = await req.json();
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY || API_KEY.length < 20) {
    return NextResponse.json(
      { error: "Server misconfiguration: API key missing or invalid." } as WeatherError,
      { status: 500 }
    );
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`;

  const geoRes = await fetch(geoUrl);

  if (!geoRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch city coordinates." } as WeatherError,
      { status: 500 }
    );
  }
  const geoData = await geoRes.json();

  if (!geoData[0]) {
    return NextResponse.json(
      { error: "City not found" } as WeatherError,
      { status: 404 }
    );
  }
  const { lat, lon } = geoData[0];

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const weatherRes = await fetch(weatherUrl);

  if (weatherRes.status === 401) {
    return NextResponse.json(
      { error: "Invalid API key for OpenWeatherMap." } as WeatherError,
      { status: 500 }
    );
  }

  if (!weatherRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch weather data." } as WeatherError,
      { status: 500 }
    );
  }
  const weatherData = await weatherRes.json();

  return NextResponse.json(weatherData as Weather);
}
