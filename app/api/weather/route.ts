import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { city } = await req.json();
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY || API_KEY.length < 20) {
    console.error("OPENWEATHER_API_KEY is missing or invalid. Check your .env file and restart the dev server.");
    return NextResponse.json({ error: "Server misconfiguration: API key missing or invalid." }, { status: 500 });
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`;

  const geoRes = await fetch(geoUrl);

  if (!geoRes.ok) {
    const text = await geoRes.text();
    console.error("Geo API error response:", text);
    return NextResponse.json({ error: `Failed to fetch city coordinates: ${text}` }, { status: 500 });
  }
  const geoData = await geoRes.json();

  if (!geoData[0]) {
    console.error("City not found in geoData");
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }
  const { lat, lon } = geoData[0];

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const weatherRes = await fetch(weatherUrl);

  if (weatherRes.status === 401) {
    const text = await weatherRes.text();
    console.error("Weather API 401 Unauthorized:", text);
    return NextResponse.json(
      { error: "Invalid API key for OpenWeatherMap. Please check your API key configuration." },
      { status: 500 }
    );
  }

  if (!weatherRes.ok) {
    const text = await weatherRes.text();
    console.error("Weather API error response:", text);
    return NextResponse.json({ error: `Failed to fetch weather data: ${text}` }, { status: 500 });
  }
  const weatherData = await weatherRes.json();

  return NextResponse.json(weatherData);
}
