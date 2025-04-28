import { X } from '@phosphor-icons/react'
import { ClotheImage, Container, RemoveButton } from './styles'

export interface ImagePreviewItemProps {
  name: string
  src: string
  onRemove: (name: string) => void
}

export function ImagePreviewItem({
  src,
  name,
  onRemove,
}: ImagePreviewItemProps) {
  return (
    <Container>
      <RemoveButton type="button" onClick={() => onRemove(name)}>
        <X size={15} weight="bold" />
      </RemoveButton>
      <ClotheImage src={src} width={80} height={80} alt="" unoptimized />
    </Container>
  )
}
