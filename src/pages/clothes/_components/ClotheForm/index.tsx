import { ArrowsClockwise, Check, Trash, UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import { Brands, Categories, Genders, Sizes } from "@/utils/select-data";

import { ButtonContainer, FormCard, FormContainer, Section, Separator } from "./styles";

import { Button } from "@/components/@ui/Button";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { Text } from "@/components/@ui/Text";
import { TextArea } from "@/components/@ui/TextArea";
import { TextInput } from "@/components/@ui/TextInput";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

export interface ClotheFormProps {
  clothe?: any
}

export function ClotheForm({ clothe }: ClotheFormProps) {
  const router = useRouter();

  const { register, control, watch } = useForm()

  const brandField = watch("brand");
  const sizeField = watch("size");

  function handleGoBack() {
    router.push("/clothes");
  }

  return (
    <FormContainer >
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

          <SelectInput placeholder="Gênero">
            {Genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.display}
              </SelectItem>
            ))}
          </SelectInput>
        </div>

        <div>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Marca"
              >
                {Brands.map((brand) => (
                  <SelectItem key={brand.value} value={brand.value}>
                    {brand.display}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />

          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Tamanho"
              >
                {Sizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.display}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
        </div>

        <div>
          {brandField === "OTHER" && (
            <TextInput css={{ width: '49%' }} placeholder="Nome da marca" />
          )}
          {sizeField === "OTHER" && (
            <TextInput css={{ width: '49%', marginLeft: 'auto' }} placeholder="Tamanho" />
          )}
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