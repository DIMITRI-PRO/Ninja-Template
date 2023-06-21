import models from "../../models/index.js";

const { Users } = models;

const getUsers = async (req, res) => {
  try {
    const [rows] = await Users.findAll();
    // eslint-disable-next-line no-param-reassign
    rows.forEach((user) => delete user.password);
    res.send(rows);
  } catch (err) {
    res.status(500);
  }
};

const getUser = async ({ payload }, res) => {
  try {
    const { sub } = payload;
    const [rows] = await Users.findUser(sub);
    if (rows[0] == null) res.sendStatus(404);
    else res.send(rows[0]);
  } catch (err) {
    res.status(500);
  }
};

const login = async (req, res, next) => {
  try {
    const [users] = await Users.readForLogin(req.body);
    if (users[0]) {
      req.user = users;
      next();
    } else {
      res.status(401).send("the informations are incorrect");
    }
  } catch (err) {
    res.status(500);
  }
};

const updateUser = async ({ body, params }, res) => {
  try {
    const user = body;
    user.id = parseInt(params.id, 10);
    const [result] = await Users.update(user);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.status(500);
  }
};

const postUser = async ({ body }, res) => {
  try {
    const { email } = body;
    const [isEmail] = await Users.findBy("email", email);

    if (isEmail[0])
      res.status(409).json({ message: "Item already taken", email });

    await Users.insert(body);
    res.status(201).json({ message: "Item successfully created" });
  } catch (err) {
    res.status(500);
  }
};

const deleteUser = async ({ params }, res) => {
  const { id } = params;
  try {
    const [result] = await Users.delete(id);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.status(204).send("Item successfully deleted from your database");
  } catch (err) {
    res.status(500);
  }
};

const userControllers = (router) => {
  router.get("/users", getUsers);

  router.get("/users/:id", getUser);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);
};

export default { userControllers, postUser, login };
