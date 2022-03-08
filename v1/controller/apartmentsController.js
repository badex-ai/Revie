import Apartment from "../models/apartmentModel.js";

import * as factory from "./handlerFactory.js";

export const getAllApartments = factory.getAll(Apartment);

export const getOne = factory.getOne(Apartment);

export const deleteApartment = factory.deleteOne(Apartment);

export const editApartment = factory.updateOne(Apartment);

export const createApartment = factory.createOne();
