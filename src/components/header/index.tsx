import { useIsMobile } from "@/hooks/use-is-mobile";
import { SpecialTitle } from "../@ui/SpecialTitle";
import { Text } from "../@ui/Text";
import { Container, Content, GoBackButton } from "./styles";
import { CaretLeft } from "@phosphor-icons/react";

export interface HeaderProps {
  title: string;
  description: string;
  goBack?: () => void;
}

export function Header({ title, description, goBack }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <Container>
      <Content>
        {goBack && (
          <GoBackButton onClick={goBack}>
            <CaretLeft size={30} />
            <Text size="md">Voltar</Text>
          </GoBackButton>
        )}
        <SpecialTitle size={isMobile ? "lg" : "xl"}>{title}</SpecialTitle>
        <Text size={isMobile ? "sm" : "md"} color="$base300">
          {description}
        </Text>
      </Content>
    </Container>
  );
}
