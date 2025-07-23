import mongoose from "mongoose";

const bannerAndAdsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    subtitle: { type: String },
    link: { type: String },      
    image: { type: String },
  },
  { timestamps: true }
);

// ✅ Correct export
export const BannerAndAds =
  mongoose.models.BannerAndAds || mongoose.model("BannerAndAds", bannerAndAdsSchema);
