export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number | null;
  brand: string;
  warrantyPeriod: number; // in months
  // category: string; in SQL query
  availability: number;
  additionalDetails: string;
  rating: number; // average user rating - [1; 5]
  ratingCount: number;
  imageUrl?: string;
  imageAltText?: string;
}
