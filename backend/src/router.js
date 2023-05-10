import { Router, json } from "express";
import users from "./models/Users/usersSchema.js";
import auth from "./middleware/auth.js";
import Controllers from "./controllers/index.js";

const { Users } = Controllers;

const router = Router();

const { hashPassword, verifyPassword, verifyToken } = auth;
const { validateUser } = users;
const { userControllers, login, postUser } = Users;

router.use(json());

router.post("/register", validateUser, hashPassword, postUser);
router.post("/login", login, verifyPassword);

router.use(verifyToken);

userControllers(router);

export default router;
