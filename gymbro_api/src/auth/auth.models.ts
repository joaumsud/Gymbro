import { z } from "zod";

const UserLoginValidate = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve conter ao menos 8 caracteres" }),
});

const UserSignupValidate = UserLoginValidate.extend({
  firstName: z
    .string({ required_error: "Nome não pode ser nulo" })
    .min(3, { message: "Nome deve ter ao menos 3 caracteres" }),
  lastName: z
    .string({ required_error: "Sobrenome não pode ser nulo" })
    .min(3, { message: "Sobrenome deve ter ao menos 3 caracteres" }),
});

export { UserLoginValidate, UserSignupValidate };
