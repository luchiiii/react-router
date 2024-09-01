const express = require("express");
const {
  createNewUser,
  getCurrentUser,
  verifyUserAccount,
} = require("../controllers/userController");
const requireSignin = require("../middlewares/requireSignin");
const {
  validateInput,
  checkValidationErrors,
} = require("../middlewares/dataValidators");
const userRouter = express.Router();

userRouter.post("/", validateInput(), checkValidationErrors, createNewUser);
userRouter.get("/me", requireSignin, getCurrentUser);
userRouter.put("/verify", verifyUserAccount);

module.exports = userRouter;
