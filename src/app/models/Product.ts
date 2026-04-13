export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  warrantyPeriod: number; // in months
  // category: string;  // TODO think about categories later
  availability: number;
  additionalDetails: string;
  rating: number; // average user rating from 1 to 5
  ratingCount?: number;
  imageUrl?: string;
  imageAltText?: string;
}
