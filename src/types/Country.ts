export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  flags: {
    svg: string;
    png: string;
  };
}
