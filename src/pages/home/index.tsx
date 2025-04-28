import { SpecialTitle } from '@/components/@ui/SpecialTitle'
import { Container, Main } from './styles'
import { Header } from '@/components/Header'
import { getCurrentPeriodMessage } from '@/utils/get-current-period-message'
import { LabeledTextInput } from '@/components/@ui/LabeledTextInput'
import { Button } from '@/components/@ui/Button'
import { Controller, useForm } from 'react-hook-form'
import { SelectInput } from '@/components/@ui/SelectInput'
import { Categories } from '@/utils/select-data'
import { SelectItem } from '@/components/@ui/SelectItem'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@/components/@ui/TextInput'

const testSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome é obrigatório.' })
    .min(5, { message: 'O nome deve conter no mínimo 5 caracteres.' }),
  price: z.string(),
  // .min(10, { message: "Preço é mínimo é R$ 10,00" }),
  category: z.enum(
    ['T_SHIRT', 'SOCIAL_SHIRT', 'DRESS', 'PANTS', 'SHORTS', 'HOODIE', 'OTHER'],
    { message: 'Selecione uma categoria.' },
  ),
})

type testData = z.infer<typeof testSchema>

export default function Home() {
  const currentPeriodMessage = getCurrentPeriodMessage()

  const { register, handleSubmit, control } = useForm<testData>({
    resolver: zodResolver(testSchema),
  })

  function handleTest(data: testData) {
    console.log(data)
  }

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />

      <Main>
        <form onSubmit={handleSubmit(handleTest)}>
          <LabeledTextInput label="test" {...register('name')} />
          <TextInput prefix="R$" placeholder="00,00" type="number" />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                label="Categoria"
              >
                {Categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.display}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
          <Button type="submit" />
        </form>
      </Main>
    </Container>
  )
}
