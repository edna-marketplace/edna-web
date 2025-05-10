import {
  ClotheSummary,
  fetchClothesWithFilter,
} from '@/api/fetch-clothes-with-filter'
import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { Text } from '@/components/@ui/Text'
import { TextInput } from '@/components/@ui/TextInput'
import { Title } from '@/components/@ui/Title'
import { Header } from '@/components/Header'
import { brands, categories, sizes } from '@/utils/enums'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, SlidersHorizontal, X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ClotheItem } from './_components/ClotheItem'
import { ActionsContainer, ClothesContainer, Container, EmptyListContainer, FilterContainer, FilterField, Main, NewClotheContainer } from './styles'

export const FilterFormSchema = z.object({
  name: z.string().optional(),
  brand: z.enum(brands).optional(),
  category: z.enum(categories).optional(),
  size: z.enum(sizes).optional(),
})

export type FilterFormData = z.infer<typeof FilterFormSchema>

export default function Clothes() {
  const [clothes, setClothes] = useState<ClotheSummary[]>([])

  const router = useRouter()

  const { register, handleSubmit, control, setValue, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema)
  })

  function handleClotheDetails(clotheId: string) {
    router.push(`/clothes/${clotheId}`)
  }

  function handleNewClothe() {
    router.push('/clothes/new')
  }

  async function handleFetchClothesWithFilter(data: FilterFormData) {
    const response = await fetchClothesWithFilter({
      name: data.name,
      category: data.category,
      brand: data.brand,
      size: data.size
    })
    setClothes(response.clothes)
  }

  async function handleClearFilters() {
    reset({
      name: "",
      brand: "ALL",
      category: "ALL",
      size: "ALL"
    })
    handleFetchClothesWithFilter({})
  }

  useEffect(() => {
    handleFetchClothesWithFilter({})
  }, [])

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <form onSubmit={handleSubmit(handleFetchClothesWithFilter)}>
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
                        {category}
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
                        {brand}
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
                        {size}
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
          <NewClotheContainer>
            <Button type='button' size="sm" onClick={handleNewClothe} variant="primary">
              <Plus size={16} />
              Nova peça
            </Button>
          </NewClotheContainer>
        </form>

        {clothes.length > 0 ? (
          <ClothesContainer>
            {clothes.map((clothe) => (
              <ClotheItem
                clothe={clothe}
                onClick={() => handleClotheDetails(clothe.id)}
              />
            ))}
          </ClothesContainer>
        ) : (
          <EmptyListContainer>
            <Title>Nenhuma peça por aqui!</Title>
            <Text>Adicione uma nova peça clicando no botão acima</Text>
          </EmptyListContainer>
        )}
      </Main>
    </Container>
  )
}
