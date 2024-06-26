import React, { useEffect, useState } from "react";
import { fetchCountries } from "./api/fetchCountries";
import { Country } from "./types/Country";
import CountryList from "./components/CountryList";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error: any) {
        setError(error.message);
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
      setCountries([...countries, country]);
    } else {
      setFavorites([...favorites, country]);
      setCountries(
        countries.filter((c) => c.name.common !== country.name.common)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
