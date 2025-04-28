import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Brands, Categories, Genders, Sizes } from "@/utils/select-data";

import { ButtonContainer, ErrorContainer, ErrorMessage, ErrorPlaceholder, FormCard, FormContainer, InputContainer, Section, Separator } from "./styles";

import { ClotheFormSchema } from "../../_schemas/form-schema";
import { ImagePreviewItem } from "../ImagePreviewItem";

import { Button } from "@/components/@ui/Button";
import { FileInput } from "@/components/@ui/FileInput";
import { LabeledTextInput } from "@/components/@ui/LabeledTextInput";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";

import { ArrowsClockwise, Check, Trash } from "@phosphor-icons/react";

import { z } from "zod";

import { Clothe, createClothe } from "@/api/create-clothe";
import { getClotheById } from "@/api/get-clothe-by-id";
import { updateClothe } from "@/api/update-clothe";
import { TextArea } from "@/components/@ui/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateClotheImages } from "@/api/update-clothe-images";
import { deleteClothe } from "@/api/delete-clothe";

type ClotheFormData = z.infer<typeof ClotheFormSchema>;

export function ClotheForm() {
  const [clothe, setClothe] = useState<Clothe>()
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ id: string, url: string }[]>([]);
  const [removedImagesIds, setRemovedImagesIds] = useState<string[]>([])

  const router = useRouter();
  const clotheId = router.query.id as string

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ClotheFormData>({
    resolver: zodResolver(ClotheFormSchema)
  })

  const brandField = watch("brand");
  const sizeField = watch("size");
  const priceField = watch("price")

  const watchedImages = watch("images");
  const imagesField: File[] = Array.isArray(watchedImages) ? watchedImages : [];

  function handleRemoveImage(name: string) {
    const filtered = imagesField.filter((f) => f.name !== name);
    setValue("images", filtered, { shouldDirty: true, shouldValidate: true });
  }

  function handleRemoveExistingImage(id: string) {
    setRemovedImagesIds(state => [...state, id])
    setExistingImages(prev => prev.filter(img => img.id !== id));
  }

  function handleGoBack() {
    router.push("/clothes");
  }

  async function handleCreateClothe(data: ClotheFormData) {
    try {
      createClothe({
        clothe: {
          name: data.name,
          priceInCents: data.price,
          description: data.description,
          fabric: data.fabric,
          color: data.color,
          store: {},
          deleted: false,
          categoryOther: null,
          brandOther: data.brandOther,
          sizeOther: data.sizeOther,
          category: data.category,
          size: data.size,
          brand: data.brand,
          gender: data.gender
        },
        files: data.images
      })

      toast.success('Peça cadastrada com sucesso!')

      router.push('/clothes')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGetClotheById() {
    const data = await getClotheById(clotheId);

    setClothe(data);

    if (data) {
      setValue("name", data.name);
      setValue("price", data.priceInCents / 100);
      setValue("category", data.category);
      setValue("gender", data.gender);
      setValue("brand", data.brand);
      setValue("size", data.size);
      setValue("fabric", data.fabric);
      setValue("color", data.color);
      setValue("description", data.description);
      setExistingImages(data.images || []);
    }
  }

  async function handleUpdateClothe(data: ClotheFormData) {
    try {
      updateClothe({
        id: clothe?.id,
        name: data.name,
        priceInCents: data.price,
        description: data.description,
        fabric: data.fabric,
        color: data.color,
        store: {},
        deleted: false,
        categoryOther: null,
        brandOther: data.brandOther,
        sizeOther: data.sizeOther,
        category: data.category,
        size: data.size,
        brand: data.brand,
        gender: data.gender
      })

      updateClotheImages(
        data.images,
        removedImagesIds,
        clotheId
      )

      toast.success('Peça atualizada com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteClothe() {
    await deleteClothe(clotheId)

    router.push('/clothes')
  }

  useEffect(() => {
    const urls = imagesField.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    if (clotheId && !clothe) {
      handleGetClotheById()
    }

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesField, clotheId, clothe]);

  return (
    <FormContainer onSubmit={handleSubmit(clothe ? handleUpdateClothe : handleCreateClothe)}>
      <FormCard>
        <div>
          <InputContainer css={{ flex: 1, minWidth: '200px' }}>
            <Text type="label">Nome da peça</Text>
            <TextInput
              placeholder="Nome da peça"
              hasError={!!errors.name}
              {...register("name")}
            />
            <ErrorContainer>
              {errors.name ? (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>

          <InputContainer css={{ flex: 1, minWidth: '130px', maxWidth: '200px' }}>
            <Text type="label">Preço</Text>
            <TextInput
              prefix="R$"
              placeholder="00,00"
              type="number"
              hasError={!!errors.price}
              {...register("price", { valueAsNumber: true })}
            />
            <ErrorContainer>
              {errors.price ? (
                <ErrorMessage>{errors.price.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>
        </div>

        <Section>
          <Text size="sm">
            A PLATAFORMA COBRA UMA <strong>TAXA DE 14%</strong> {" "}
            POR VENDA, VOCÊ RECEBERÁ <strong>{priceField ?
              (priceField * 0.86)
                .toLocaleString('pt-br',
                  { style: 'currency', currency: 'BRL' })
              : "R$ 00,00"
            }</strong> POR ESSA PEÇA
          </Text>
        </Section>

        <div>
          <InputContainer>
            <Text type="label">Categoria</Text>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectInput
                  onValueChange={field.onChange}
                  placeholder={"Categoria"}
                  hasError={!!errors.category}
                  {...field}
                >
                  {Categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.display}
                    </SelectItem>
                  ))}
                </SelectInput>
              )}
            />
            <ErrorContainer>
              {errors.category ? (
                <ErrorMessage>{errors.category.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>

          <InputContainer>
            <Text type="label">Gênero</Text>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Gênero"
                  hasError={!!errors.gender}
                >
                  {Genders.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.display}
                    </SelectItem>
                  ))}
                </SelectInput>
              )}
            />
            <ErrorContainer>
              {errors.gender ? (
                <ErrorMessage>{errors.gender.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>
        </div>

        <div>
          <InputContainer>
            <Text type="label">Marca</Text>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Marca"
                  hasError={!!errors.brand}
                >
                  {Brands.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      {brand.display}
                    </SelectItem>
                  ))}
                </SelectInput>
              )}
            />
            <ErrorContainer>
              {errors.brand ? (
                <ErrorMessage>{errors.brand.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>

          <InputContainer>
            <Text type="label">Tamanho</Text>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Tamanho"
                  hasError={!!errors.size}
                >
                  {Sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.display}
                    </SelectItem>
                  ))}
                </SelectInput>
              )}
            />
            <ErrorContainer>
              {errors.size ? (
                <ErrorMessage>{errors.size.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>
        </div>

        <div>
          {brandField === "OTHER" && (
            <InputContainer css={{ width: '49%', marginBottom: '$4' }}>
              <Text type="label">Marca (Outro)</Text>
              <TextInput
                placeholder="Marca (Outra)"
                {...register("brandOther")}
              />
            </InputContainer>
          )}
          {sizeField === "OTHER" && (
            <InputContainer css={{ width: '49%', marginLeft: 'auto', marginBottom: '$4' }}>
              <Text type="label">Tamanho (Outro)</Text>
              <TextInput
                placeholder="Tamanho (Outro)"
                {...register("sizeOther")}
              />
            </InputContainer>
          )}
        </div>

        <Separator />

        <div>
          <InputContainer>
            <Text type="label">Tecido</Text>
            <TextInput
              placeholder="Tecido"
              hasError={!!errors.fabric}
              {...register("fabric")}
            />
            <ErrorContainer>
              {errors.fabric ? (
                <ErrorMessage>{errors.fabric.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>

          <InputContainer>
            <Text type="label">Cor</Text>
            <TextInput
              placeholder="Cor"
              hasError={!!errors.color}
              {...register("color")}
            />
            <ErrorContainer>
              {errors.color ? (
                <ErrorMessage>{errors.color.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>
        </div>
      </FormCard>

      <FormCard>
        <Text type="label">Descrição (Opcional)</Text>
        <TextArea
          css={{ flex: 1 }}
          placeholder="Descrição (opcional)"
          {...register("description")}
        />

        <div style={{ marginTop: "32px" }}>
          <InputContainer css={{ maxWidth: '200px' }}>
            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FileInput
                  placeholder="Escolher fotos"
                  hasError={!!errors.images}
                  onChange={(event) => {
                    const files = event.target.files ? Array.from(event.target.files) : [];
                    field.onChange(files);
                  }}
                />
              )}
            />
            <ErrorContainer>
              {errors.images ? (
                <ErrorMessage>{errors.images.message}</ErrorMessage>
              ) : (
                <ErrorPlaceholder />
              )}
            </ErrorContainer>
          </InputContainer>

          <Text css={{ maxWidth: '400px', minWidth: '190px', marginBottom: '1.5rem' }} size="xs">
            No máximo 5 imagens nos formatos JPEG, JPG ou PNG com até 5MB (Recomendado: 1080x1920).
          </Text>
        </div>

        <Section css={{ minHeight: '140px' }}>
          {imagePreviews.length > 0 || existingImages.length > 0 ? (
            <>
              {existingImages.map((image) => (
                <ImagePreviewItem
                  key={image.id}
                  name={image.id}
                  src={image.url}
                  onRemove={() => handleRemoveExistingImage(image.id)}
                />
              ))}
              {imagesField.map((file, i) => (
                <ImagePreviewItem
                  key={file.name}
                  name={file.name}
                  src={imagePreviews[i]}
                  onRemove={handleRemoveImage}
                />
              ))}
            </>
          ) : (
            <Text css={{ flex: 1, opacity: .6 }} size="md">Nenhuma foto selecionada</Text>
          )}
        </Section>
      </FormCard>
      <div></div>
      <ButtonContainer>
        {clothe && (
          <Button type="button" variant="destructive" onClick={handleDeleteClothe}>
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