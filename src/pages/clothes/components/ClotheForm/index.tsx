import { useRouter } from "next/router";
import { UploadSimple, Trash, ArrowsClockwise, Check } from "@phosphor-icons/react";

import { Categories, Brands, Genders, Sizes } from "@/utils/select-data";

import { FormContainer, FormCard, Section, Separator, ButtonContainer } from "./styles";

import { TextInput } from "@/components/@ui/TextInput";
import { Text } from "@/components/@ui/Text";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { TextArea } from "@/components/@ui/TextArea";
import { Button } from "@/components/@ui/Button";

export interface ClotheFormProps {
  clothe?: any
}

export function ClotheForm({ clothe }: ClotheFormProps) {
  const router = useRouter();

  function handleGoBack() {
    router.push("/clothes");
  }

  return (
    <FormContainer>
      <FormCard>
        <div>
          <TextInput css={{ flex: 1, minWidth: '200px' }} placeholder="Nome da peça" />
          <TextInput css={{ flex: 1, minWidth: '130px', maxWidth: '200px' }} prefix="R$" placeholder="00,00" />
        </div>

        <Section>
          <Text size="sm">
            A PLATAFORMA COBRA UMA <strong>TAXA DE 14%</strong> POR VENDA, VOCÊ RECEBERÁ <strong>R$ 00,00</strong> POR ESSA PEÇA
          </Text>
        </Section>

        <div>
          <SelectInput placeholder="Categoria">
            {Categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.display}
              </SelectItem>
            ))}
          </SelectInput>

          <SelectInput placeholder="Marca">
            {Brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.display}
              </SelectItem>
            ))}
          </SelectInput>
        </div>

        <div>
          <SelectInput placeholder="Gênero">
            {Genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.display}
              </SelectItem>
            ))}
          </SelectInput>
          <SelectInput placeholder="Tamanho">
            {Sizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.display}
              </SelectItem>
            ))}
          </SelectInput>
        </div>

        <Separator />

        <div>
          <TextInput placeholder="Tecido" />
          <TextInput placeholder="Cor" />
        </div>
      </FormCard>

      <FormCard>
        <TextArea css={{ flex: 1 }} placeholder="Descrição (opcional)" />

        <div>
          <Button css={{ flex: 1, minWidth: '160px' }} variant="secondary">
            <UploadSimple />
            Escolher fotos
          </Button>

          <Text css={{ maxWidth: '400px', minWidth: '190px' }} size="sm">
            No máximo 5 imagens nos formatos JPEG, JPG ou PNG com até 5MB.
          </Text>
        </div>

        <Section css={{ minHeight: '140px' }}>
          <Text css={{ flex: 1, opacity: .6 }} size="md">Nenhuma foto selecionada</Text>
        </Section>
      </FormCard>
      <div></div>
      <ButtonContainer>
        {clothe && (
          <Button type="button" variant="destructive">
            <Trash weight="bold" />
            Excluir
          </Button>
        )}
        <div>
          <Button type="button" variant="tertiary" onClick={handleGoBack}>Cancelar</Button>
          <Button type="submit">
            {clothe ? (
              <>
                <ArrowsClockwise />
                Atualizar peça
              </>
            ) : (
              <>
                <Check />
                Cadastrar peça
              </>
            )}
          </Button>
        </div>
      </ButtonContainer>
    </FormContainer>
  )
}