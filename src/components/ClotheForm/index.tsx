import Swal from "sweetalert2";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormCard, FormContainer, InputContainer, Section } from "./styles";

import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";

import { brands, categories, sizes } from "@/utils/enums";

import { Clothe, createClothe } from "@/api/create-clothe";
import { deleteClothe } from "@/api/delete-clothe";
import { getClotheById } from "@/api/get-clothe-by-id";
import { updateClothe } from "@/api/update-clothe";
import { updateClotheImages } from "@/api/update-clothe-images";
import { TextArea } from "@/components/@ui/TextArea";

import { ProductDetails } from "./ClotheDetails";
import { ClotheImages } from "./ClotheImages";
import { FormActions } from "./FormActions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const ClotheFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "O nome é obrigatório." })
    .min(5, { message: "No mínimo 5 caracteres." }),
  priceInCents: z
    .number({ message: "O valor é obrigatório." })
    .min(10, { message: "O valor mínimo é R$ 10,00." })
    .transform((val) => Math.round(val * 100)),
  category: z.enum(categories, { message: "Selecione uma categoria." }),
  categoryOther: z.string().optional().nullable(),
  gender: z.enum(["MALE", "FEMALE", "UNISEX"], {
    message: "Selecione um gênero.",
  }),
  brand: z.enum(brands, { message: "Selecione uma marca." }),
  brandOther: z.string().optional().nullable(),
  size: z.enum(sizes, { message: "Selecione um tamanho." }),
  sizeOther: z.string().optional().nullable(),
  fabric: z.string().min(1, { message: "O tecido é obrigatório." }),
  color: z.string().min(1, { message: "A cor é obrigatória." }),
  height: z
    .number()
    .optional()
    .nullable()
    .or(z.nan().transform(() => undefined))
    .or(z.null().transform(() => undefined)),
  width: z
    .number()
    .optional()
    .nullable()
    .or(z.nan().transform(() => undefined))
    .or(z.null().transform(() => undefined)),
  description: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .max(5, { message: "Selecione no máximo 5 foto." })
    .optional(),
});

export type ClotheFormData = z.infer<typeof ClotheFormSchema>;

export function ClotheForm() {
  const [clothe, setClothe] = useState<Clothe>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<
    { id: string; url: string }[]
  >([]);
  const [removedImagesIds, setRemovedImagesIds] = useState<string[]>([]);

  const router = useRouter();
  const clotheId = router.query.id as string;

  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClotheFormData>({
    resolver: zodResolver(ClotheFormSchema),
  });

  const priceField = watch("priceInCents");

  const watchedImages = watch("images");
  // garante que imagesField seja sempre um array, mesmo se watchedImages for undefined
  const imagesField: File[] = Array.isArray(watchedImages) ? watchedImages : [];

  function handleRemoveImage(name: string) {
    // filtra as imagens removendo a que tem o nome específico
    const filtered = imagesField.filter((f) => f.name !== name);
    setValue("images", filtered, { shouldDirty: true, shouldValidate: true });
  }

  function handleRemoveExistingImage(id: string) {
    // adiciona o id da imagem na lista de imagens removidas para enviar ao backend
    setRemovedImagesIds((state) => [...state, id]);
    // remove a imagem da lista de imagens existentes no estado local
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
  }

  function handleGoBack() {
    router.push("/clothes");
  }

  async function handleCreateClothe(data: ClotheFormData) {
    try {
      // valida se há pelo menos uma imagem (nova ou existente)
      if (imagesField.length === 0 && existingImages.length === 0) {
        setError("images", {
          type: "custom",
          message: "Selecione pelo menos 1 foto.",
        });
        return;
      }

      await createClothe({
        clothe: {
          ...data,
          deleted: false,
        },
        images: data.images ? data.images : [],
      });

      toast.success("Peça cadastrada com sucesso!");

      router.push("/clothes");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetClotheById() {
    const data = await getClotheById(clotheId);

    setClothe(data);

    if (data) {
      // preenche o formulário com os dados da peça existente
      setValue("name", data.name);
      // converte centavos para reais para exibição no formulário
      setValue("priceInCents", data.priceInCents / 100);
      setValue("category", data.category);
      setValue("categoryOther", data.categoryOther);
      setValue("gender", data.gender);
      setValue("brand", data.brand);
      setValue("brandOther", data.brandOther);
      setValue("size", data.size);
      setValue("sizeOther", data.sizeOther);
      setValue("fabric", data.fabric);
      setValue("color", data.color);
      setValue("description", data.description);
      setValue("height", data.height);
      setValue("width", data.width);
      setExistingImages(data.images || []);
    }
  }

  async function handleUpdateClothe(data: ClotheFormData) {
    try {
      // valida se há pelo menos uma imagem (nova ou existente)
      if (imagesField.length === 0 && existingImages.length === 0) {
        setError("images", {
          type: "custom",
          message: "Selecione pelo menos 1 foto.",
        });
        return;
      }
      // valida o limite máximo de imagens
      if (imagesField.length + existingImages.length > 5) {
        toast.error(`Você pode adicionar no máximo 5 imagens.`);
        return;
      }

      // atualiza dados da peça (menos as imagens)
      await updateClothe({
        id: clothe?.id,
        ...data,
        deleted: false,
      });

      // atualiza as imagens separadamente, enviando novas imagens e ids das removidas
      updateClotheImages(
        data.images ? data.images : [],
        removedImagesIds,
        clotheId
      );

      toast.success("Peça atualizada com sucesso!");
      router.push("/clothes");
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteClothe() {
    // exibe modal de confirmação antes de excluir
    Swal.fire({
      title: "Excluir peça!",
      icon: "warning",
      text: "Você realmente deseja excluir essa peça?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim, desejo excluir.",
      confirmButtonColor: "#4F4C42",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteClothe(clotheId);

        toast.success("Peça excluída com sucesso!");

        router.push("/clothes");
      }
    });
  }

  useEffect(() => {
    // cria urls temporárias para preview das imagens selecionadas
    const urls = imagesField.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    // busca dados da peça se estivermos editando (clotheId existe) e ainda não temos os dados
    if (clotheId && !clothe) {
      handleGetClotheById();
    }

    // cleanup: revoga as urls temporárias para evitar memory leak
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesField, clotheId, clothe]);

  return (
    <FormContainer
      onSubmit={handleSubmit(clothe ? handleUpdateClothe : handleCreateClothe)}
    >
      <FormCard>
        <div>
          <InputContainer css={{ flex: 1, minWidth: "200px" }}>
            <Text type="label">Nome da peça*</Text>
            <TextInput
              placeholder="Nome da peça"
              maxLength={60}
              errorMessage={errors.name?.message}
              hasErrorPlaceholder
              {...register("name")}
            />
          </InputContainer>

          <InputContainer
            css={{ flex: 1, minWidth: "130px", maxWidth: "200px" }}
          >
            <Text type="label">Preço*</Text>
            <TextInput
              prefix="R$"
              placeholder="00,00"
              type="number"
              errorMessage={errors.priceInCents?.message}
              hasErrorPlaceholder
              {...register("priceInCents", { valueAsNumber: true })}
            />
          </InputContainer>
        </div>

        <Section>
          <Text size="sm" css={{ whiteSpace: "normal" }}>
            A PLATAFORMA COBRA UMA <strong>TAXA DE 14%</strong> POR VENDA, VOCÊ
            RECEBERÁ{" "}
            <strong>
              <span style={{ wordBreak: "break-all", display: "inline-block" }}>
                {priceField
                  ? (priceField * 0.86).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ 00,00"}
              </span>
            </strong>{" "}
            POR ESSA PEÇA
          </Text>
        </Section>

        <ProductDetails
          register={register}
          control={control}
          errors={errors}
          watch={watch}
        />
        <Text size="xs" style={{ fontWeight: "normal", marginBottom: "8px" }}>
          Campos indicados com * são obrigatórios
        </Text>
      </FormCard>

      <FormCard>
        <div style={{ justifyContent: "space-between" }}>
          <InputContainer css={{ flex: 1, minWidth: "130px" }}>
            <Text type="label">Comprimento</Text>
            <TextInput
              suffix="cm"
              placeholder="0"
              step={1}
              type="number"
              {...register("height", {
                valueAsNumber: true,
              })}
              errorMessage={errors.height?.message}
              hasErrorPlaceholder
            />
          </InputContainer>
          <InputContainer css={{ flex: 1, minWidth: "130px" }}>
            <Text type="label">Largura</Text>
            <TextInput
              suffix="cm"
              placeholder="0"
              step={1}
              type="number"
              {...register("width", {
                valueAsNumber: true,
              })}
              errorMessage={errors.width?.message}
              hasErrorPlaceholder
            />
          </InputContainer>
        </div>

        <Text type="label">Descrição</Text>
        <TextArea
          css={{ flex: 1 }}
          placeholder="Descrição"
          {...register("description")}
        />

        <ClotheImages
          imagePreviews={imagePreviews}
          existingImages={existingImages}
          imagesField={imagesField}
          handleRemoveImage={handleRemoveImage}
          handleRemoveExistingImage={handleRemoveExistingImage}
          control={control}
          errors={errors}
        />
      </FormCard>
      <div></div>
      <FormActions
        clothe={clothe}
        isSubmitting={isSubmitting}
        handleGoBack={handleGoBack}
        handleDeleteClothe={handleDeleteClothe}
      />
    </FormContainer>
  );
}
