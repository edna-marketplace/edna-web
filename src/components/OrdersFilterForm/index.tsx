import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { Text } from '@/components/@ui/Text'
import { TextInput } from '@/components/@ui/TextInput'
import { orderStatus } from '@/utils/enums'
import { orderStatusDisplayNames } from '@/utils/select-input-mapper'
import { SlidersHorizontal, X } from '@phosphor-icons/react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'
import { ActionsContainer, FilterContainer, FilterField } from './styles'

export const FilterFormSchema = z.object({
  clotheName: z.string().optional(),
  customerName: z.string().optional(),
  orderStatus: z.enum(orderStatus).optional()
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

      <FilterField css={{ minWidth: "200px" }}>
        <Text type="label" size="sm">Nome da Peça</Text>
        <TextInput placeholder="Nome da Peça" {...register("clotheName")} />
      </FilterField>

      <FilterField css={{ minWidth: "200px" }}>
        <Text type="label" size="sm">Nome do Cliente</Text>
        <TextInput placeholder="Nome do Cliente" {...register("customerName")} />
      </FilterField>

      <FilterField>
        <Text type="label" size="sm">Status</Text>
        <Controller
          name='orderStatus'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              placeholder="Status"
              onValueChange={onChange}
              value={value?.toString()}
            >
              {orderStatus.map((orderStatus) => (
                <SelectItem key={orderStatus} value={orderStatus}>
                  {orderStatusDisplayNames[orderStatus]}
                </SelectItem>
              ))}
            </SelectInput>
          )}
        />
      </FilterField>

      <ActionsContainer>
        <Button type='submit' variant="secondary">
          <SlidersHorizontal size={16}/>
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
