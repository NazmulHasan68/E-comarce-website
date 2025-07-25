import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    banner: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    link: { type: String },
    isAds : { type : Boolean, default:false}
  },
  { timestamps: true }
);

//  Correct export
export const Hero =
  mongoose.models.Hero || mongoose.model("Hero", heroSchema);
