import * as yup from "yup";

const requestSchema = yup
  .object({
    name: yup.string().trim().required("name is required"),
    email: yup
      .string()
      .trim()
      .email("email is invalid")
      .required("email is required"),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required("password is required"),
  })
  .noUnknown();

async function validateRequestBody(req, res, next) {
  try {
    const validated = await requestSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = validated;
    next();
  } catch (error) {
    if (error && error.name === "ValidationError") {
      const messages = error.errors || ["Validation error"];
      return res
        .status(400)
        .json({ message: "Invalid request", errors: messages });
    }
    next(error);
  }
}

export default validateRequestBody;
