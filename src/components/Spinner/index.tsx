import { CircleNotch } from "@phosphor-icons/react";
import { Container } from "./styles";

interface SpinnerProps {
  color?: string;
}

export function Spinner({ color = "#4F4C42" }: SpinnerProps) {
  return (
    <Container>
      <CircleNotch weight="bold" color={color} />
    </Container>
  );
}
