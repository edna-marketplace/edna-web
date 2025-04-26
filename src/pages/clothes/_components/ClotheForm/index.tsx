import { ArrowsClockwise, Check, Trash, UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import { Brands, Categories, Genders, Sizes } from "@/utils/select-data";

import { ButtonContainer, FormCard, FormContainer, Section, Separator } from "./styles";

import { Button } from "@/components/@ui/Button";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { Text } from "@/components/@ui/Text";
import { TextArea } from "@/components/@ui/TextArea";
import { Controller, useForm } from "react-hook-form";
import { LabeledTextInput } from "@/components/@ui/LabeledTextInput";
import { TextInput } from "@/components/@ui/TextInput";
import { LabeledTextArea } from "@/components/@ui/TextArea/index";
import { FileInput } from "@/components/@ui/FileInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePreviewItem } from "../ImagePreviewItem";

export interface ClotheFormProps {
  clothe?: any
}


export function ClotheForm({ clothe }: ClotheFormProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();

  const { control, watch, setValue } = useForm()

  const brandField = watch("brand");
  const sizeField = watch("size");
  const watchedImages = watch("images");

  const imagesField: File[] = Array.isArray(watchedImages) ? watchedImages : [];

  function handleRemoveImage(name: string) {
    const filtered = imagesField.filter((f) => f.name !== name);
    setValue("images", filtered, { shouldDirty: true, shouldValidate: true });
  }

  function handleGoBack() {
    router.push("/clothes");
  }

  useEffect(() => {
    const urls = imagesField.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    console.log(watchedImages)
    console.log(imagesField)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesField]);

  console.log(imagePreviews)

  return (
    <FormContainer >
      <FormCard>
        <div>
          <LabeledTextInput css={{ flex: 1, minWidth: '200px' }} label="Nome da peça" />
          <TextInput css={{ flex: 1, minWidth: '130px', maxWidth: '200px' }} prefix="R$" placeholder="00,00" />
        </div>

        <Section>
          <Text size="sm">
            A PLATAFORMA COBRA UMA <strong>TAXA DE 14%</strong> POR VENDA, VOCÊ RECEBERÁ <strong>R$ 00,00</strong> POR ESSA PEÇA
          </Text>
        </Section>

        <div>
          <SelectInput label="Categoria">
            {Categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.display}
              </SelectItem>
            ))}
          </SelectInput>

          <SelectInput label="Gênero">
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
                label="Marca"
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
                label="Tamanho"
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
            <LabeledTextInput css={{ width: '49%' }} label="Marca (Outra)" />
          )}
          {sizeField === "OTHER" && (
            <LabeledTextInput css={{ width: '49%', marginLeft: 'auto' }} label="Tamanho (Outro)" />
          )}
        </div>

        <Separator />

        <div>
          <LabeledTextInput label="Tecido" />
          <LabeledTextInput label="Cor" />
        </div>
      </FormCard>

      <FormCard>
        <LabeledTextArea css={{ flex: 1 }} label="Descrição (opcional)" />

        <div>
          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FileInput
                placeholder="Escolher fotos"
                onChange={(event) => {
                  const files = event.target.files ? Array.from(event.target.files) : [];
                  field.onChange(files);
                }}
              />
            )}
          />

          <Text css={{ maxWidth: '400px', minWidth: '190px' }} size="sm">
            No máximo 5 imagens nos formatos JPEG, JPG ou PNG com até 5MB (Recomendado: 1080x1920).
          </Text>
        </div>

        <Section css={{ minHeight: '140px' }}>
          {imagePreviews.length > 0 ? (
            imagesField.map((file, i) => (
              <ImagePreviewItem
                key={file.name}
                name={file.name}            // ← pass the file’s name
                src={imagePreviews[i]}
                onRemove={handleRemoveImage}
              />
            ))
          ) : (
            <Text css={{ flex: 1, opacity: .6 }} size="md">Nenhuma foto selecionada</Text>
          )}
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
    </FormContainer >
  )
}