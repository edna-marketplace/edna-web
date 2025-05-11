import { Control, Controller, FieldErrors } from "react-hook-form"
import { ClotheFormData } from ".."
import { InputContainer, Section } from "../styles";
import { FileInput } from "@/components/@ui/FileInput";
import { Text } from "@/components/@ui/Text";
import { ImagePreviewItem } from "../ImagePreviewItem";
import { TipContainer } from "./styles";
import { Lightbulb } from "@phosphor-icons/react";

export interface ClotheImagesProps {
  imagePreviews: string[]
  existingImages: { id: string; url: string }[]
  imagesField: File[]
  handleRemoveImage: (name: string) => void
  handleRemoveExistingImage: (id: string) => void
  control: Control<ClotheFormData>
  errors: FieldErrors<ClotheFormData>
}

export function ClotheImages({
  imagePreviews,
  existingImages,
  imagesField,
  handleRemoveImage,
  handleRemoveExistingImage,
  control,
  errors,
}: ClotheImagesProps) {
  return (
    <>
      <div style={{ marginTop: '32px' }}>
        <InputContainer css={{ maxWidth: '200px' }}>
          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FileInput
                placeholder="Escolher fotos"
                errorMessage={errors.images?.message}
                hasErrorPlaceholder
                onChange={(event) => {
                  const files = event.target.files
                    ? Array.from(event.target.files)
                    : []
                  field.onChange(files)
                }}
              />
            )}
          />
        </InputContainer>

        <Text
          css={{
            maxWidth: '400px',
            minWidth: '190px',
            marginBottom: '1.5rem',
          }}
          size="xs"
        >
          No máximo 5 imagens nos formatos JPEG, JPG ou PNG com até 5MB
          (Recomendado: 1080x1920).
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
          <Text css={{ flex: 1, opacity: 0.6 }} size="md">
            Nenhuma foto selecionada
          </Text>
        )}
      </Section>
      <TipContainer>
        <Lightbulb weight="bold" />
        <Text size="xs">
          Recomendamos que a primeira foto da peça seja no corpo
        </Text>
      </TipContainer>
    </>
  )
}