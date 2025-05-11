import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { TextInput } from '@/components/@ui/TextInput'
import { Plus, SlidersHorizontal } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { Container } from './styles'
import { FetchClothesWithFilterRequest } from '@/api/fetch-clothes-with-filter'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { brands, categories, sizes } from '@/utils/enums'

export const FilterFormSchema = z.object({
  name: z.string().optional(),
  category: z.enum(categories).optional(),
  brand: z.enum(brands).optional(),
  size: z.enum(sizes).optional()
})

export type FilterFormData = z.infer<typeof FilterFormSchema>

export interface FilterFormProps {
  handleFetchClothesWithFilter: (data: FetchClothesWithFilterRequest) => FetchClothesWithFilterRequest
}

export function FilterForm({ handleFetchClothesWithFilter }: FilterFormProps) {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema)
  })

  function handleNewClothe() {
    router.push('/clothes/new')
  }
  return (
    <form onSubmit={handleSubmit(handleFetchClothesWithFilter)}>
      <Container>
        <div>
          <SelectInput placeholder="Categoria">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectInput>
        </div>
        <div>
          <SelectInput placeholder="Marca">
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectInput>
        </div>
        <div>
          <SelectInput placeholder="Tamanho">
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectInput>
        </div>
        <div style={{ width: '28%', minWidth: '200px', flex: 'unset' }}>
          <TextInput placeholder="Nome da peça" />
        </div>
        <Button type='submit' variant="secondary">
          <SlidersHorizontal size={17} />
          Filtrar
        </Button>
        <Button type='button' onClick={handleNewClothe}>
          <Plus size={17} />
          Nova peça
        </Button>
      </Container>
    </form>
  )
}
