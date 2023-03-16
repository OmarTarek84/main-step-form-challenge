export interface Step {
  number: number;
  title: string;
}

export interface Plan {
  value: string,
  title: string,
  pricePerMonth?: number,
  pricePerYear?: number,
  monthsFree?: number
};

export interface Addon {
  title: string;
  subtitle: string;
  value: string;
  pricesAddedPerMonth: number;
  pricesAddedPerYear: number;
}
