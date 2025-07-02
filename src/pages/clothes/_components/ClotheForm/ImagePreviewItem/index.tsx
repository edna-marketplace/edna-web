import { X } from "@phosphor-icons/react";
import { ClotheImage, Container, RemoveButton } from "./styles";
import { Text } from "@/components/@ui/Text";

export interface ImagePreviewItemProps {
  name: string;
  src: string;
  onRemove: (name: string) => void;
  isCover?: boolean;
}

export function ImagePreviewItem({
  src,
  name,
  onRemove,
  isCover = false,
}: ImagePreviewItemProps) {
  return (
    <Container>
      <RemoveButton type="button" onClick={() => onRemove(name)}>
        <X size={15} weight="bold" />
      </RemoveButton>
      <ClotheImage src={src} width={80} height={80} alt="" unoptimized />
      {isCover && (
        <div
          style={{
            padding: "2px",
            marginTop: "-10px",
            background: "var(--colors-base100)",
            borderRadius: "0 0 6px 6px",
          }}
        >
          <Text size="xs" style={{ color: "#FFF" }}>
            Foto Capa
          </Text>
        </div>
      )}
    </Container>
  );
}
