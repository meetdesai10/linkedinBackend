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
  console.log(": registerUser -> isUserExist", isUserExist);

  if (isUserExist?.email === email || isUserExist?.username === username) {
    throw new ApiError(400, "User already exist");
  }

  // email validation

  const emailExpression =
    /^[^\s@]+@[^\s@]+\.(?:com|net|org|edu|gov|mil|info|biz|co\.uk|ac\.uk|com\.au|co\.in|co\.jp|ca|us|me|io|name)$/i;

  if (!emailExpression.test(email)) {
    throw new ApiError(400, "please enter valid email");
  }

  // password validation

  const regularPasswordExpression =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$/;

  if (password.length < 8 || password.length > 25) {
    throw new ApiError(
      400,
      "password must be in between 8 characters to 25 characters"
    );
  }
  if (!regularPasswordExpression.test(password)) {
    throw new ApiError(
      400,
      "password should contain atleast one number , one capital letter and one special character"
    );
  }

  // send data to the Database

  const user = await User.create({ fullname, email, username, password });

  // send response to the client

  const createdUSer = await User.findById(user._id).select("-password");
  return res.status(200).send(createdUSer);
});

export { registerUser };
