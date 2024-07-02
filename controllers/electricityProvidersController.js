import { validationResult } from "express-validator";
import { ApiError } from "../error/ApiError.js";
import { ElectricityProviders } from "../schemas/electricityProvidersSchema.js";

export const createElectricityProvider = async (req, res, next) => {
  try {
    const {
      name,
      country,
      marketShare,
      renewableEnergyPercentage,
      yearlyRevenue,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest({ error: errors.array() }));
    }

    const electricityProviders = await ElectricityProviders.findOne({ name });

    if (electricityProviders) {
      return next(ApiError.badRequest("Company already exists"));
    }

    const newElectricityProvider = new ElectricityProviders({
      name,
      country,
      marketShare,
      renewableEnergyPercentage,
      yearlyRevenue,
    });

    await newElectricityProvider.save();

    return res.status(200).json({
      message: "Successfully created",
      company: {
        name,
        country,
        marketShare,
        renewableEnergyPercentage,
        yearlyRevenue,
      },
    });
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const getAllElectricityProvider = async (req, res, next) => {
  try {
    const electricityProviders = await ElectricityProviders.find();
    return res.status(200).json(electricityProviders);
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const getOneElectricityProvider = async (req, res, next) => {
  try {
    const { id } = req.params;

    const electricityProviders = await ElectricityProviders.findById(id);

    if (!electricityProviders) {
      return next(ApiError.badRequest("Company not found"));
    }

    return res.status(200).json(electricityProviders);
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const deleteElectricityProvider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingElectricityProvider = await ElectricityProviders.findById(id);
    if (!existingElectricityProvider) {
      return next(ApiError.badRequest("Company not found"));
    }

    await existingElectricityProvider.deleteOne();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const updateElectricityProvider = async (req, res, next) => {
  try {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest({ error: errors.array() }));
    }

    const { marketShare, renewableEnergyPercentage, yearlyRevenue } = req.body;

    const existingElectricityProvider = await ElectricityProviders.findById(id);

    if (!existingElectricityProvider) {
      return next(ApiError.notFound("Company not found"));
    }
    if (marketShare !== undefined) {
      existingElectricityProvider.marketShare = marketShare;
    }
    if (renewableEnergyPercentage !== undefined) {
      existingElectricityProvider.renewableEnergyPercentage =
        renewableEnergyPercentage;
    }
    if (yearlyRevenue !== undefined) {
      existingElectricityProvider.yearlyRevenue = yearlyRevenue;
    }

    await existingElectricityProvider.save();

    return res.status(200).json({
      message: "Successfully updated",
    });
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};
