import React, { useEffect, useState } from "react";
import { fetchCountries } from "./api/fetchCountries";
import { Country } from "./types/Country";
import CountryList from "./components/CountryList";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const toggleFavorite = (country: Country) => {
    if (favorites.find((fav) => fav.name.common === country.name.common)) {
      setFavorites(
        favorites.filter((fav) => fav.name.common !== country.name.common)
      );
      setCountries((prevCountries) =>
        [...prevCountries, country].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
    } else {
      setFavorites([...favorites, country]);
      setCountries((prevCountries) =>
        prevCountries.filter((c) => c.name.common !== country.name.common)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <CountryList
        countries={favorites}
        toggleFavorite={toggleFavorite}
        title="Favorite Countries"
      />
      <CountryList
        countries={countries}
        toggleFavorite={toggleFavorite}
        title="Countries"
      />
    </div>
  );
};

export default App;
