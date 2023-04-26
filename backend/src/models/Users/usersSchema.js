import Joi from "joi";

const userSchema = Joi.object({
  lastname: Joi.string().max(45).required(),
  firstname: Joi.string().max(45).required(),
  email: Joi.string().email().max(254).required(),
  password: Joi.string().max(254).required(),
  serviceId: Joi.number().integer().allow(null),
  pseudo: Joi.string().max(45).required(),
  picture: Joi.string().max(254).required(),
});

const validateUser = ({ body }, res, next) => {
  const { error } = userSchema.validate(body, { abortEarly: false });
  if (error) return res.status(422).json({ validationErrors: error.details });
  return next();
};

export default { validateUser };
