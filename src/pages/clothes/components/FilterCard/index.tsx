import { SelectItem, Text } from "@edna-ui/react"
import { Container } from "./styles"
import { SelectInput } from "@/components/@ui/SelectInput"
import { TextInput } from "@/components/@ui/TextInput"
import { Button } from "@/components/@ui/Button"
import { Plus, SlidersHorizontal } from "@phosphor-icons/react"

export function FilterCard() {
  return (
    <Container>
      <div>
        <Text type="label">Categoria</Text>
        <SelectInput placeholder="Selecionar">
          <SelectItem value="T_SHIRT">Camiseta</SelectItem>
          <SelectItem value="SOCIAL_SHIRT">Camisa social</SelectItem>
          <SelectItem value="DRESS">Vestido</SelectItem>
          <SelectItem value="PANTS">Calça</SelectItem>
          <SelectItem value="SHORTS">Shorts</SelectItem>
          <SelectItem value="HOODIE">Moletom</SelectItem>
          <SelectItem value="OTHER">Outro</SelectItem>
        </SelectInput>
      </div>
      <div>
        <Text type="label">Marca</Text>
        <SelectInput placeholder="Selecionar">
          <SelectItem value="NIKE">Nike</SelectItem>
          <SelectItem value="ADIDAS">Adidas</SelectItem>
          <SelectItem value="HERING">Hering</SelectItem>
          <SelectItem value="ZARA">Zara</SelectItem>
          <SelectItem value="FARM">Farm</SelectItem>
          <SelectItem value="CEA">C&A</SelectItem>
          <SelectItem value="RENNER">Renner</SelectItem>
          <SelectItem value="OTHER">Outra</SelectItem>
        </SelectInput>
      </div>
      <div>
        <Text type="label">Tamanho</Text>
        <SelectInput placeholder="Selecionar">
          <SelectItem value="XS">PP</SelectItem>
          <SelectItem value="S">P</SelectItem>
          <SelectItem value="M">M</SelectItem>
          <SelectItem value="L">G</SelectItem>
          <SelectItem value="XL_LARGER">GG ou maior</SelectItem>
          <SelectItem value="N_34">34</SelectItem>
          <SelectItem value="N_36">36</SelectItem>
          <SelectItem value="N_38">38</SelectItem>
          <SelectItem value="N_40">40</SelectItem>
          <SelectItem value="N_42">42</SelectItem>
          <SelectItem value="N_44">44</SelectItem>
          <SelectItem value="N_46">46</SelectItem>
          <SelectItem value="N_48">48</SelectItem>
          <SelectItem value="N_50">50</SelectItem>
          <SelectItem value="N_52">52</SelectItem>
          <SelectItem value="N_54">54</SelectItem>
          <SelectItem value="N_56_LARGER">56 ou maior</SelectItem>
          <SelectItem value="OTHER">Outro</SelectItem>
        </SelectInput>
      </div>
      <div style={{ width: '35%', flex: 'unset' }}>
        <Text type="label">Nome</Text>
        <TextInput placeholder="Pesquisar" />
      </div>
      <Button variant="secondary">
        <SlidersHorizontal size={17} />
        Filtros
      </Button>
      <Button>
        <Plus size={17} />
        Adicionar peça
      </Button>
    </Container>
  )
}