export interface RatingType {
  region: string;
  value: string;
}

export interface CreditRatingType extends RatingType {
  'Investment grade': number;
  'Non-investment grade': number;
  'Highly speculative': number;
  'Substantial risk or extremely speculative': number;
  'In default': number;
}

export interface DsaRatingType extends RatingType {
  'In debt distress': number;
  High: number;
  Moderate: number;
  Low: number;
}

export interface CategoryData {
  category: string;
  description: string;
  source: number;
}
