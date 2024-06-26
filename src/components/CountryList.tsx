import React from "react";
import { Country } from "../types/Country";
import "./CountryList.css";

interface CountryListProps {
  countries: Country[];
  toggleFavorite: (country: Country) => void;
  title: string;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  toggleFavorite,
  title,
}) => {
  return (
    <div className="country-list">
      <h1>{title}</h1>
      <ul className="country-grid">
        {countries.map((country, index) => (
          <li
            key={index}
            className="country-item"
            onClick={() => toggleFavorite(country)}
          >
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <div className="country-info">
              <h2>{country.name.common}</h2>
              <p>{country.capital?.[0]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
