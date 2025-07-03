import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { TextInput } from '@/components/@ui/TextInput'
import { brands, categories, sizes } from '@/utils/enums'
import { SlidersHorizontal, X } from '@phosphor-icons/react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'
import { ActionsContainer, FilterContainer, FilterField } from './styles'
import { brandDisplayNames, categoryDisplayNames, sizeDisplayNames } from '@/utils/select-input-mapper'
import { Text } from '@/components/@ui/Text'


export const FilterFormSchema = z.object({
  name: z.string().optional(),
  category: z.enum(categories).optional(),
  brand: z.enum(brands).optional(),
  size: z.enum(sizes).optional()
})

export type FilterFormData = z.infer<typeof FilterFormSchema>

export interface FilterFormProps {
  register: UseFormRegister<FilterFormData>
  control: Control<FilterFormData>
  handleClearFilters: () => void
}

export function FilterForm({
  register,
  control,
  handleClearFilters
}: FilterFormProps) {

  return (
    <FilterContainer>
      <FilterField>
        <Text type="label" size="sm">Categoria</Text>
        <Controller
          name='category'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              placeholder="Selecionar"
              onValueChange={onChange}
              value={value?.toString()}
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {categoryDisplayNames[category]}
                </SelectItem>
              ))}
            </SelectInput>
          )}
        />
      </FilterField>

      <FilterField>
        <Text type="label" size="sm">Marca</Text>
        <Controller
          name='brand'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              placeholder="Selecionar"
              onValueChange={onChange}
              value={value?.toString()}
            >
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brandDisplayNames[brand]}
                </SelectItem>
              ))}
            </SelectInput>
          )}
        />
      </FilterField>

      <FilterField>
        <Text type="label" size="sm">Tamanho</Text>
        <Controller
          name='size'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              placeholder="Selecionar"
              onValueChange={onChange}
              value={value?.toString()}
            >
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {sizeDisplayNames[size]}
                </SelectItem>
              ))}
            </SelectInput>
          )}
        />
      </FilterField>

      <FilterField css={{ minWidth: "200px" }}>
        <Text type="label" size="sm">Nome da peça</Text>
        <TextInput placeholder="Pesquisar" {...register("name")} />
      </FilterField>

      <ActionsContainer>
        <Button type='submit' variant="secondary">
          <SlidersHorizontal size={16} />
          Filtrar
        </Button>
        <Button type='button' variant="tertiary" onClick={handleClearFilters}>
          <X size={16} />
          Limpar
        </Button>
      </ActionsContainer>
    </FilterContainer>
  )
}
