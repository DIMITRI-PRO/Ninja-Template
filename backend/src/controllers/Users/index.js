import models from "../../models/index.js";

const { Users } = models;

const getUsers = async (req, res) => {
  try {
    const [rows] = await Users.findAll();
    res.send(rows);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getUser = async ({ params }, res) => {
  const { id } = params;
  try {
    const [rows] = await Users.find(id);
    if (rows[0] == null) res.sendStatus(404);
    else res.send(rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
};

const login = async (req, res, next) => {
  try {
    const [users] = await Users.readForLogin(req.body);
    if (users[0]) {
      req.user = users;
      next();
    } else {
      res.status(401).send("This mail doesn't exist in our database");
    }
  } catch (err) {
    res.status(500).send("Error retrieving data from database");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    user.id = parseInt(req.params.id, 10);
    const [result] = await Users.update(user);
    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

const postUser = async (req, res) => {
  try {
    const users = req.body;
    const [result] = await Users.insert(users);
    res.location(`/users/${result.insertId}`).sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteUser = async ({ params }, res) => {
  const { id } = params;
  try {
    const [result] = await Users.delete(id);
    if (result.affectedRows === 0) res.sendStatus(404);
    else res.status(204).send("Item successfully deleted from your database");
  } catch (err) {
    res.sendStatus(500);
  }
};

const userControllers = (router) => {
  router.get("/users", getUsers);

  router.get("/users/:id", getUser);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);
};

export default { userControllers, postUser, login };
