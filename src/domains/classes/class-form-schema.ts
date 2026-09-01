import { z } from "zod";

export const classFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da turma.")
    .min(3, "O nome deve ter entre 3 e 80 caracteres.")
    .max(80, "O nome deve ter entre 3 e 80 caracteres."),
  shift: z.enum(["morning", "afternoon", "evening"]),
});

export type TClassFormValues = z.infer<typeof classFormSchema>;
