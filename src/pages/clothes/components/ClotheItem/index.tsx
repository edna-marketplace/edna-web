import { Title } from "@/components/@ui/Title";
import { ComponentProps } from "react";
import { ClotheImage, Container, Dot, InfoContainer } from "./styles";

type ClotheItemProps = ComponentProps<typeof Container>

export function ClotheItem({ ...props }: ClotheItemProps) {
  return (
    <Container {...props}>
      <ClotheImage src="https://github.com/matheusbarcc.png" alt="" width={188} height={188} />
      <Title size="sm">R$ 100</Title>
      <Title size="xs" color="base200">Terno preto Dolce & Ga...</Title>

      <InfoContainer>
        <Title size="xs" color="base400">Dolce & Gabbana</Title>
        <Dot />
        <Title size="xs" color="base400">M</Title>
      </InfoContainer>
    </Container>
  )
}