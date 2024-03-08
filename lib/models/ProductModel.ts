import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String,  required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: String, required: true, default: 0 },
    numReviews: { type: String, required: true, default: 0 },
    counInStock: { type: String, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    banner: String,
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.models.Items || mongoose.model('Items', productSchema)

export default ProductModel


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
  counInStock: string;
  colors?: [];
  sizes?: [];
};

