import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { TextInput } from '@/components/@ui/TextInput'
import { Brands, Categories, Sizes } from '@/utils/select-data'
import { Plus, SlidersHorizontal } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { Container } from './styles'

export function FilterForm() {
  const router = useRouter()

  function handleNewClothe() {
    router.push('/clothes/new')
  }
  return (
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
      <div style={{ width: '30%', minWidth: '200px', flex: 'unset' }}>
        <TextInput placeholder="Nome da peça" />
      </div>
      {/* <Button variant="secondary">
        <SlidersHorizontal size={17} />
        Filtros
      </Button> */}
      <Button onClick={handleNewClothe}>
        <Plus size={17} />
        Nova peça
      </Button>
    </Container>
  )
}
