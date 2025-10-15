import { z } from "zod";

export const ACTIVITY_TYPES = ["codigo", "discursiva", "objetiva"];

export const activitySchema = z.object({
  title: z.string().min(3, "Nome da atividade deve ter ao menos 3 caracteres"),
  type: z.string().refine((value) => ACTIVITY_TYPES.includes(value), {
    message: "Selecione um tipo de atividade válido",
  }),
  description: z
    .string()
    .min(10, "Descrição da atividade deve ter ao menos 10 caracteres"),
});
