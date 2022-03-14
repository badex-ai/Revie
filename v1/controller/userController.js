import * as factory from "./handlerFactory.js";

import User from "../models/userModel.js";

export const getUser = factory.getOne(User);
