import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import {
  FormCard,
  FormContainer,
  InputContainer,
  Section
} from './styles'

import { Text } from '@/components/@ui/Text'
import { TextInput } from '@/components/@ui/TextInput'

import { brands, categories, sizes } from '@/utils/enums'

import { Clothe, createClothe } from '@/api/create-clothe'
import { deleteClothe } from '@/api/delete-clothe'
import { getClotheById } from '@/api/get-clothe-by-id'
import { updateClothe } from '@/api/update-clothe'
import { updateClotheImages } from '@/api/update-clothe-images'
import { TextArea } from '@/components/@ui/TextArea'

import { ProductDetails } from './ClotheDetails'
import { ClotheImages } from './ClotheImages'
import { FormActions } from './FormActions'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const ClotheFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome é obrigatório.' })
    .min(5, { message: 'No mínimo 5 caracteres.' }),
  priceInCents: z
    .number({ message: 'O valor é obrigatório.' })
    .min(10, { message: 'O valor mínimo é R$ 10,00.' })
    .transform((val) => Math.round(val * 100)),
  category: z.enum(categories, { message: 'Selecione uma categoria.' }),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX'], { message: 'Selecione um gênero.' }),
  brand: z.enum(brands, { message: 'Selecione uma marca.' }),
  brandOther: z.string().optional().nullable(),
  size: z.enum(sizes, { message: 'Selecione um tamanho.' }),
  sizeOther: z.string().optional().nullable(),
  fabric: z.string().min(1, { message: 'O tecido é obrigatório.' }),
  color: z.string().min(1, { message: 'A cor é obrigatória.' }),
  description: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .max(5, { message: 'Selecione no máximo 5 foto.' })
    .optional(),
})

export type ClotheFormData = z.infer<typeof ClotheFormSchema>

export function ClotheForm() {
  const [clothe, setClothe] = useState<Clothe>()
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<{ id: string; url: string }[]>([])
  const [removedImagesIds, setRemovedImagesIds] = useState<string[]>([])

  const router = useRouter()
  const clotheId = router.query.id as string

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
  })

  const priceField = watch('priceInCents')

  const watchedImages = watch('images')
  const imagesField: File[] = Array.isArray(watchedImages) ? watchedImages : []

  function handleRemoveImage(name: string) {
    const filtered = imagesField.filter((f) => f.name !== name)
    setValue('images', filtered, { shouldDirty: true, shouldValidate: true })
  }

  function handleRemoveExistingImage(id: string) {
    setRemovedImagesIds((state) => [...state, id])
    setExistingImages((prev) => prev.filter((img) => img.id !== id))
  }

  function handleGoBack() {
    router.push('/clothes')
  }

  async function handleCreateClothe(data: ClotheFormData) {
    try {
      if (imagesField.length === 0 && existingImages.length === 0) {
        setError('images', {
          type: 'custom',
          message: 'Selecione pelo menos 1 foto.',
        })
        return
      }

      await createClothe({
        clothe: {
          ...data,
          deleted: false
        },
        images: data.images ? data.images : [],
      })

      toast.success('Peça cadastrada com sucesso!')

      router.push('/clothes')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGetClotheById() {
    const data = await getClotheById(clotheId)

    setClothe(data)

    if (data) {
      setValue('name', data.name)
      setValue('priceInCents', data.priceInCents / 100)
      setValue('category', data.category)
      setValue('gender', data.gender)
      setValue('brand', data.brand)
      setValue('brandOther', data.brandOther)
      setValue('size', data.size)
      setValue('sizeOther', data.sizeOther)
      setValue('fabric', data.fabric)
      setValue('color', data.color)
      setValue('description', data.description)
      setExistingImages(data.images || [])
    }
  }

  async function handleUpdateClothe(data: ClotheFormData) {
    try {
      if (imagesField.length === 0 && existingImages.length === 0) {
        setError('images', {
          type: 'custom',
          message: 'Selecione pelo menos 1 foto.',
        })
        return
      }
      if (imagesField.length + existingImages.length > 5) {
        toast.error(`Você pode adicionar no máximo 5 imagens.`)
        return
      }

      await updateClothe({
        id: clothe?.id,
        ...data,
        deleted: false
      })

      updateClotheImages(
        data.images ? data.images : [],
        removedImagesIds,
        clotheId,
      )

      toast.success('Peça atualizada com sucesso!')
      router.push('/clothes')
    } catch (error) {
      console.error(error)
    }
  }

  function handleDeleteClothe() {
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
        await deleteClothe(clotheId)

        toast.success("Peça excluída com sucesso!")

        router.push('/clothes')
      }
    })
  }

  useEffect(() => {
    const urls = imagesField.map((file) => URL.createObjectURL(file))
    setImagePreviews(urls)

    if (clotheId && !clothe) {
      handleGetClotheById()
    }

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imagesField, clotheId, clothe])

  return (
    <FormContainer
      onSubmit={handleSubmit(clothe ? handleUpdateClothe : handleCreateClothe)}
    >
      <FormCard>
        <div>
          <InputContainer css={{ flex: 1, minWidth: '200px' }}>
            <Text type="label">Nome da peça</Text>
            <TextInput
              placeholder="Nome da peça"
              errorMessage={errors.name?.message}
              hasErrorPlaceholder
              {...register('name')}
            />
          </InputContainer>

          <InputContainer
            css={{ flex: 1, minWidth: '130px', maxWidth: '200px' }}
          >
            <Text type="label">Preço</Text>
            <TextInput
              prefix="R$"
              placeholder="00,00"
              type="number"
              errorMessage={errors.priceInCents?.message}
              hasErrorPlaceholder
              {...register('priceInCents', { valueAsNumber: true })}
            />
          </InputContainer>
        </div>

        <Section>
          <Text size="sm">
            A PLATAFORMA COBRA UMA <strong>TAXA DE 14%</strong> POR VENDA, VOCÊ
            RECEBERÁ{' '}
            <strong>
              {priceField
                ? (priceField * 0.86).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
                : 'R$ 00,00'}
            </strong>{' '}
            POR ESSA PEÇA
          </Text>
        </Section>

        <ProductDetails
          register={register}
          control={control}
          errors={errors}
          watch={watch}
        />

      </FormCard>

      <FormCard>
        <Text type="label">Descrição (Opcional)</Text>
        <TextArea
          css={{ flex: 1 }}
          placeholder="Descrição (opcional)"
          {...register('description')}
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
  )
}