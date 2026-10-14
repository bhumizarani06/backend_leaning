
import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);


productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1, price: 1 });

export const Product = model<IProduct>("Product", productSchema);
