import { Container, Content } from "./styles";
import { SpecialTitle, Text } from "@edna-ui/react";

export interface HeaderProps {
  title: string,
  description: string,
  hasBackButton?: () => void
}

export function Header({ title, description, hasBackButton }: HeaderProps) {
  return (
    <Container>
      <Content>
        {hasBackButton && (
          <div>a</div>
        )}
        <SpecialTitle size="xl">
          {title}
        </SpecialTitle>
        <Text size="md">
          {description}
        </Text>
      </Content>
    </Container>
  )
}