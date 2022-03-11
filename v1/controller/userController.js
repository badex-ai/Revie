import * as factory from "./handlerFactory.js";

import User from "../models/userModel.js";

export const signUp = (req, res, next) => {};
export const signIn = (req, res, next) => {};

export const getAllUsers = factory.getAll(User);

export const getUser = factory.getOne(User);

export const deleteUser = factory.deleteOne(User);

export const editUser = factory.updateOne(User);
