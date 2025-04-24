import { useIsMobile } from "@/hooks/use-is-mobile";
import { SpecialTitle } from "../@ui/SpecialTitle";
import { Text } from "../@ui/Text";
import { Container, Content } from "./styles";

export interface HeaderProps {
  title: string,
  description: string,
  hasBackButton?: () => void
}

export function Header({ title, description, hasBackButton }: HeaderProps) {
  const isMobile = useIsMobile()

  return (
    <Container>
      <Content>
        {hasBackButton && (
          <div>a</div>
        )}
        <SpecialTitle size={isMobile ? 'lg' : 'xl'}>
          {title}
        </SpecialTitle>
        <Text size={isMobile ? 'sm' : 'md'} color="$base300">
          {description}
        </Text>
      </Content>
    </Container>
  )
}