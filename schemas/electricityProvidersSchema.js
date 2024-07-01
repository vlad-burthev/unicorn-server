import { Schema } from "mongoose";

export const electricityProvidersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    marketShare: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    renewableEnergyPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    yearlyRevenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
