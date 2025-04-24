import { Title } from "@/components/@ui/Title";
import { ComponentProps } from "react";
import { ClotheImage, Container, Dot, InfoContainer } from "./styles";

type ClotheItemProps = ComponentProps<typeof Container>

export function ClotheItem({ ...props }: ClotheItemProps) {
  return (
    <Container {...props}>
      <ClotheImage
        src="https://www.dolcegabbana.com/dw/image/v2/BKDB_PRD/on/demandware.static/-/Sites-15/default/dw3f42b3a6/images/zoom/GKLOMTFU1L5_N0000_1.jpg?sw=740&sh=944"
        alt=""
        width={170}
        height={170}
      />
      <Title size="sm">R$ 100</Title>

      {/* adicionar logica para trucar o nome caso seja maior que 22 caracteres */}
      <Title size="xs" color="base200">Terno preto Dolce & G...</Title>

      <InfoContainer>
        {/* adicionar logica para truncar marca caso seja maior que 15 caracteres */}
        <Title size="xs" color="base400">Dolce & Gabbana</Title>
        <Dot />
        <Title size="xs" color="base400">GG</Title>
      </InfoContainer>
    </Container>
  )
}