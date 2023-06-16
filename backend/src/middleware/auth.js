import { hash, verify } from "argon2";
import jsonwebtoken from "jsonwebtoken";

const { sign, verify: verifyJWT } = jsonwebtoken;

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, {
      y: 2,
      m: 15360,
      t: 2,
      p: 1,
    });
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    console.warn(err);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { user, body } = req;
    const [{ id, password, pseudo, email, firstname, lastname, picture }] =
      user;
    const isVerified = await verify(password, body.password);
    if (isVerified) {
      const payload = { sub: id };
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: `${process.env.EXPIRE_TIME}s`,
      });
      delete user.password;
      res.cookie(process.env.NAME_COOKIE, token, {
        maxAge: process.env.EXPIRE_TIME * 1000,
      });
      res.status(200).json({ pseudo, email, firstname, lastname, picture });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = verifyJWT(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("Erreur de verification Token:", err);
    res.location(`/login`).clearCookie(process.env.NAME_COOKIE).sendStatus(401);
  }
};

export default {
  hashPassword,
  verifyPassword,
  verifyToken,
};
