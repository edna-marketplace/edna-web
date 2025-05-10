import { z } from 'zod'

import { brands, categories, sizes } from '@/utils/enums'

export const ClotheFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome é obrigatório.' })
    .min(5, { message: 'O nome deve conter no mínimo 5 caracteres.' }),
  price: z
    .number({ message: 'O valor é obrigatório.' })
    .min(10, { message: 'O valor mínimo é R$ 10,00.' })
    .transform((val) => Math.round(val * 100)),
  category: z.enum(categories, { message: 'Selecione uma categoria.' }),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX'], { message: 'Selecione um gênero.' }),
  brand: z.enum(brands, { message: 'Selecione uma marca.' }),
  brandOther: z.string().optional().nullable(),
  size: z.enum(sizes, { message: 'Selecione um tamanho.' }),
  sizeOther: z.string().optional().nullable(),
  fabric: z.string().min(1, { message: 'O tecido é obrigatório.' }),
  color: z.string().min(1, { message: 'A cor é obrigatória.' }),
  description: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .max(5, { message: 'Selecione no máximo 5 foto.' })
    .optional(),
})
