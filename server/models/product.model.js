import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],

  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },

  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  category: { type: String },
  band : {type: String},

  stock: { type: Number, default: 0 },
  colors: [{ type: String }],
  sizes: [{ type: String }],

  isPopular: { type: Boolean, default: false },
  isSuggested: { type: Boolean, default: false },
  isBestSelling: { type: Boolean, default: false },

  madeIn: { type: String },
  tags: [{ type: String }],
  slug: { type: String, unique: true },

  productDetails: { type : String},
  link: { type: String },
  sales : { type : Number},
  
}, { timestamps: true });

// Fixed export line
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
