// src/api/fetchCountries.ts

import { Country } from "../types/Country";

const API_URL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data: Country[] = await response.json();
  return data;
};
