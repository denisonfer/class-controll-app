import { z } from "zod";

export const schoolFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome da escola.")
    .min(3, "O nome deve ter entre 3 e 80 caracteres.")
    .max(80, "O nome deve ter entre 3 e 80 caracteres.")
    .regex(/^\p{L}/u, "O nome deve começar com uma letra."),
  address: z
    .string()
    .trim()
    .min(1, "Informe o endereço da escola.")
    .min(5, "O endereço deve ter entre 5 e 120 caracteres.")
    .max(120, "O endereço deve ter entre 5 e 120 caracteres.")
    .regex(/^\p{L}/u, "O endereço deve começar com uma letra."),
});

export type TSchoolFormValues = z.infer<typeof schoolFormSchema>;
