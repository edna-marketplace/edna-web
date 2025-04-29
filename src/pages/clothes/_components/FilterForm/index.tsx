import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { TextInput } from '@/components/@ui/TextInput'
import { Brands, Categories, Sizes } from '@/utils/select-data'
import { Plus, SlidersHorizontal } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { Container } from './styles'
import { FetchClothesWithFilterRequest } from '@/api/fetch-clothes-with-filter'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const FilterFormSchema = z.object({
  name: z.string().optional(),
  category: z.enum(
    [
      'T_SHIRT',
      'SOCIAL_SHIRT',
      'SUIT',
      'ACTIVEWEAR',
      'DRESS',
      'PANTS',
      'SHORTS',
      'JACKET_HOODIE',
      'UNDERWEAR',
      'FOOTWEAR',
      'ACCESSORIES',
      'SLEEPWEAR',
      'SWIMWEAR',
    ]).optional(),
  brand: z.enum(
    ['NIKE', 'ADIDAS', 'HERING', 'ZARA', 'FARM', 'CEA', 'RENNER', 'OTHER'],
  ).optional(),
  size: z.enum(
    [
      'XS',
      'S',
      'M',
      'L',
      'XL_LARGER',
      'N_34',
      'N_36',
      'N_38',
      'N_40',
      'N_42',
      'N_44',
      'N_46',
      'N_48',
      'N_50',
      'N_52',
      'N_54',
      'N_56_LARGER',
      'OTHER',
    ]).optional()
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
            {Categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.display}
              </SelectItem>
            ))}
          </SelectInput>
        </div>
        <div>
          <SelectInput placeholder="Marca">
            {Brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.display}
              </SelectItem>
            ))}
          </SelectInput>
        </div>
        <div>
          <SelectInput placeholder="Tamanho">
            {Sizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.display}
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
