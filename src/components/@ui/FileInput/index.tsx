import { ComponentProps, ElementRef, forwardRef } from 'react'
import { toast } from 'sonner'
import { FileInputContainer, Input, Label } from './styles'
import { UploadSimple } from '@phosphor-icons/react/dist/ssr'

export interface FileInputProps extends ComponentProps<typeof Input> {
  maxFiles?: number
  maxSizeInMB?: number
  hasError?: boolean
}

export const FileInput = forwardRef<ElementRef<typeof Input>, FileInputProps>(
  (
    {
      css,
      maxFiles = 5,
      maxSizeInMB = 5,
      onChange,
      value: _value,
      hasError,
      ...props
    }: FileInputProps,
    ref,
  ) => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files

      if (files && files.length > maxFiles) {
        toast.error(`Você pode adicionar no máximo ${maxFiles} imagens.`)

        event.target.value = ''
        return
      }

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSizeInBytes) {
            toast.error(
              `A imagem "${files[i].name}" excedeu o limite de ${maxSizeInMB}MB.`,
            )

            event.target.value = ''
            return
          }
        }
      }

      if (onChange) {
        onChange(event)
      }
    }

    return (
      <FileInputContainer css={css} hasError={hasError}>
        <Label htmlFor="file-input">
          <UploadSimple size={17} />
          Escolher fotos
        </Label>
        <Input
          id="file-input"
          ref={ref}
          type="file"
          multiple
          accept=".jpeg,.jpg,.png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          {...props}
        />
      </FileInputContainer>
    )
  },
)

FileInput.displayName = 'File Input'
