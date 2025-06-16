import Button from "../Button/Button";
import Card from "../Card/Card";
import { useState } from "react";
import Input from "../Input/Input";

type WeatherInputProps = {
  onSearch: (city: string) => void;
  loading: boolean;
  resetOnSearch?: boolean;
};

const WeatherInput: React.FC<WeatherInputProps> = ({
  onSearch,
  loading,
  resetOnSearch = false,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    onSearch(city);
    if (resetOnSearch) setCity("");
  };

  return (
    <Card className="bg-white max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center items-center gap-4"
      >
        <h3>Search for a city</h3>
        <Input
          type="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. London"
        />
        <Button
          type="submit"
          className="px-3 py-1 w-40 text-white"
          disabled={loading || !city}
          loading={loading}
        >
          Search
        </Button>
      </form>
    </Card>
  );
};

export default WeatherInput;
