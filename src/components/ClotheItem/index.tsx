import { Title } from "@/components/@ui/Title";
import { ComponentProps } from "react";
import { ClotheImage, Container, Dot, InfoContainer } from "./styles";
import { ClotheSummary } from "@/api/fetch-clothes-with-filter";
import {
  brandDisplayNames,
  sizeDisplayNames,
} from "@/utils/select-input-mapper";

type ClotheItemProps = ComponentProps<typeof Container> & {
  clothe: ClotheSummary;
};

export function ClotheItem({ clothe, ...props }: ClotheItemProps) {
  function getBrandDisplayName(clothe: ClotheSummary) {
    let brandName =
      clothe.brand === "OTHER"
        ? clothe.brandOther || brandDisplayNames.OTHER
        : brandDisplayNames[clothe.brand];

    if (brandName.length > 10) {
      return `${brandName.slice(0, 7)}...`;
    }

    return brandName;
  }

  function getSizeDisplayName(clothe: ClotheSummary) {
    let size =
      clothe.size === "OTHER"
        ? clothe.sizeOther || sizeDisplayNames.OTHER
        : sizeDisplayNames[clothe.size];

    if (size.length > 8) {
      return `${size.slice(0, 6)}...`;
    }

    return size;
  }

  return (
    <Container {...props}>
      <ClotheImage src={clothe.imageURL} alt="" width={170} height={170} />
      <Title className="price" size="sm">
        {(clothe.priceInCents / 100).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Title>

      <Title size="xs" color="base200">
        {clothe.name.length > 22
          ? `${clothe.name.slice(0, 17)}...`
          : clothe.name}
      </Title>

      <InfoContainer>
        <Title size="xs" color="base400">
          {getBrandDisplayName(clothe)}
        </Title>
        <Dot />
        <Title size="xs" color="base400">
          {getSizeDisplayName(clothe)}
        </Title>
      </InfoContainer>
    </Container>
  );
}
