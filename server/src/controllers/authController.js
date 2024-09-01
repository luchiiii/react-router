const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const generateOTP = require("../helpers/randomCodeGenerator");
const { sendPasswordResetEmail } = require("../helpers/emailHelpers");
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/index");

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verify if user with email exist on database

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ error: "user with this email does not exist" });
    }

    //check if user is verified
    if (!userExist.isVerified) {
      return res.status(403).json({ error: "User account is not verified" });
    }

    //verify if user password is correct
    const passwordMatch = await bcrypt.compareSync(
      password,
      userExist.password
    );
    if (!passwordMatch) {
      return res.status(403).json({ error: "Invalid login credentials" });
    }

    //generate refresh and access token
    const userData = { userId: userExist._id, email: userExist.email };
    const accessToken = generateToken(
      userData,
      `${ACCESS_TOKEN_EXPIRES_IN}h`,
      JWT_SECRET
    );
    const refreshToken = generateToken(
      userData,
      `${REFRESH_TOKEN_EXPIRES_IN}h`,
      JWT_SECRET
    );
    //send back success response with token
    //also save access token to browser cookie storage
    const cookieOptions = {
      expires: new Date(Date.now() + 3600), // Cookie expires in 1 hour,
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ message: "user loggedin success", refreshToken });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //check if user exists in database
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    //generate password reset token
    const resetPasswordToken = generateOTP();

    //update user object with reset password token
    userExist.resetPasswordToken = resetPasswordToken;

    //save user object
    await userExist.save();

    //send password reset token to user email
    sendPasswordResetEmail(userExist.resetPasswordToken, userExist.email);

    //send success response to client
    return res.status(200).json({ message: "Password reset token sent" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//update user password
const updateUserPassword = async (req, res) => {
  try {
    const { resetPasswordToken, password } = req.body;

    //check if user exists in database
    const userExists = await User.findOne({ resetPasswordToken });

    //send error response if user does not exist
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    //generate password salt
    const salt = bcrypt.genSaltSync(10);
    //encrypt/hash new password
    const hashedPassword = bcrypt.hashSync(password, salt);

    //update new password on user object
    userExists.password = hashedPassword;
    // update password reset token on user object to undefined
    userExists.resetPasswordToken = undefined;

    //save user data on database
    await userExists.save();

    //send success response to client on successful password update
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Servor Error" });
  }
};

//generate new access token
const generateNewAccessToken = async (req, res) => {
  try {
    // get auth headers from req.headers
    const headers = req.headers["authorization"];
    //check if refresh token is valid
    if (headers.split(" ")[0] !== "Bearer") {
      return res.status(403).json({ error: "invalid token" });
    }
    //get the refresh token
    const refreshToken = headers.split(" ")[1];
    //verify the refresh token
    const payload = verifyToken(refreshToken, JWT_SECRET);
    const userData = {
      userId: payload.userId,
      email: payload.email,
    };
    //generate new access token
    const accessToken = generateToken(userData, "1h", ACCESS_TOKEN_SECRET);
    if (!accessToken) {
      return res.status(400).json({ error: "token generation failed" });
    }
    //send back success response with tokens
    //also save access token to browser cookie storage
    const cookieOptions = {
      expires: new Date(Date.now() + 3600), //Cookie expires in 1 hour
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ message: "new access token generated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//logout user
const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .json({ message: "logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { loginUser, generateNewAccessToken, logoutUser, updateUserPassword, resetPassword };
