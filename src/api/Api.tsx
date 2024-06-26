import React, { useEffect, useState } from "react";

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flag: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name.common}`}
              width="50"
            />
            <span>{country.name.common}</span> - {country.region} - Population:{" "}
            {country.population}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
