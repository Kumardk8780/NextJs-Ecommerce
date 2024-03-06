export type Product = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  counInStock: number;
  colors?: [];
  sizes?: [];
};
