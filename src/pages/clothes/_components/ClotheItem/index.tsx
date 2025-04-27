import { Title } from "@/components/@ui/Title";
import { ComponentProps } from "react";
import { ClotheImage, Container, Dot, InfoContainer } from "./styles";
import { ClotheSummary } from "@/api/fetch-clothes-with-filter";

type ClotheItemProps = ComponentProps<typeof Container> & {
  clothe: ClotheSummary
}

export function ClotheItem({ clothe, ...props }: ClotheItemProps) {
  const brandMapper: Record<string, string> = {
    NIKE: "Nike",
    ADIDAS: "Adidas",
    HERING: "Hering",
    ZARA: "Zara",
    FARM: "Farm",
    CEA: "C&A",
    RENNER: "Renner",
    OTHER: "Outro"
  };


  const sizeMapper: Record<string, string> = {
    XS: "PP",
    S: "P",
    M: "M",
    L: "G",
    XL_LARGER: "GG ou maior",
    N_34: "34",
    N_36: "36",
    N_38: "38",
    N_40: "40",
    N_42: "42",
    N_44: "44",
    N_46: "46",
    N_48: "48",
    N_50: "50",
    N_52: "52",
    N_54: "54",
    N_56_LARGER: "56 ou maior",
    OTHER: "Outro"
  };


  return (
    <Container {...props}>
      <ClotheImage
        src={clothe.imageURL}
        alt=""
        width={170}
        height={170}
      />
      <Title size="sm">
        {clothe.priceInCents.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </Title>

      {/* adicionar logica para trucar o nome caso seja maior que 22 caracteres */}
      <Title size="xs" color="base200">{clothe.name}</Title>

      <InfoContainer>
        {/* adicionar logica para truncar marca caso seja maior que 15 caracteres */}
        <Title size="xs" color="base400">{brandMapper[clothe.brand]}</Title>
        <Dot />
        <Title size="xs" color="base400">{sizeMapper[clothe.size]}</Title>
      </InfoContainer>
    </Container>
  )
}