import { SelectItem, Text } from "@edna-ui/react"
import { Container } from "./styles"
import { SelectInput } from "@/components/@ui/SelectInput"
import { TextInput } from "@/components/@ui/TextInput"
import { Button } from "@/components/@ui/Button"
import { Plus, SlidersHorizontal } from "@phosphor-icons/react"
import { Brands, Categories, Sizes } from "@/utils/select-data"

export function FilterCard() {


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
      <div style={{ width: '30%', flex: 'unset' }}>
        <TextInput placeholder="Nome da peça" />
      </div>
      <Button variant="secondary">
        <SlidersHorizontal size={17} />
        Filtros
      </Button>
      <Button>
        <Plus size={17} />
        Nova peça
      </Button>
    </Container>
  )
}