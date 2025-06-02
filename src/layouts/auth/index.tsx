import { BackgroundImageContainer, Container, FormContainer } from "./styles"

import backgroundImage from '@/assets/background-image.svg'

export interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Container>
      <BackgroundImageContainer src={backgroundImage} alt="" />
      <FormContainer>
        {children}
      </FormContainer>
    </Container>
  )
}