import { CircleNotch } from "@phosphor-icons/react";
import { Container } from "./styles";

interface SpinnerProps {
  color?: string;
  size?: number;
}

export function Spinner({ size = 16, color = "#4F4C42" }: SpinnerProps) {
  return (
    <Container>
      <CircleNotch size={size} weight="bold" color={color} />
    </Container>
  );
}
