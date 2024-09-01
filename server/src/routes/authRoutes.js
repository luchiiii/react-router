const express = require("express");
const {
  loginUser,
  logoutUser,
  generateNewAccessToken, updateUserPassword, resetPassword
} = require("../controllers/authController");
const requireSignin = require("../middlewares/requireSignin");
const authRouter = express.Router();
authRouter.post("/login", loginUser);

authRouter.post("/logout", requireSignin, logoutUser);
authRouter.post("/reset-password", resetPassword);
authRouter.put("/update-password", updateUserPassword);
authRouter.get("/access-token", generateNewAccessToken);


module.exports = authRouter;
