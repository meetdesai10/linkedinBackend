import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (
    [fullname, email, username, password].some((data) => data?.trim() === "")
  ) {
    throw new ApiError(404, "All fields required");
  }

  // check if user already exist or not

  const isUserExist = await User.findOne({ $or: [{ username, email }] });

  if (isUserExist) {
    throw new ApiError(400, "user already exist");
  }

  // send data to the Database

  const user = await User.create({ fullname, email, username, password });

  // send response to the client

  const createdUSer = await User.findById(user._id).select("-password");
  return res.status(200).send(createdUSer);
});

export { registerUser };
