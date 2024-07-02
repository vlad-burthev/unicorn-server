import mongoose from "mongoose";

export const ElectricityProvidersSchema = new mongoose.Schema(
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

export const ElectricityProviders = mongoose.model(
  "Electricity_Providers",
  ElectricityProvidersSchema
);
