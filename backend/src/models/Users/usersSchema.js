import Joi from "joi";

const userSchema = Joi.object({
  lastname: Joi.string().max(45).required(),
  firstname: Joi.string().max(45).required(),
  email: Joi.string().email().max(254).required(),
  password: Joi.string().max(254).required(),
  pseudo: Joi.string().max(45).required(),
  picture: Joi.string().max(254).allow(null),
});

const validateUser = async (req, res, next) => {
  const { body } = req;
  try {
    const { error } = userSchema.validate(body, { abortEarly: false });

    if (error) res.json({ validationErrors: error.details }).sendStatus(422);
    else next();
  } catch (err) {
    console.error(err);
  }
};

export default { validateUser };
