import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "A senha deve conter letra maiúscula, minúscula, número e caractere especial"
    ),
});
