import * as factory from "./handlerFactory.ja";

import User from "../models/userModel.js";

export const createUser = factory.createOne(User);

export const getAllUsers = factory.getAll(User);

export const getUser = factory.getOne(User);

export const deleteUser = factory.deleteOne(User);

export const editUser = factory.updateOne(User);
