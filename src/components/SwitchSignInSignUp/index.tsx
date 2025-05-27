import { useState } from "react";
import { Button } from "../@ui/Button";
import { ButtonContainer, Container, SelectedContainer } from "./styles";

export function SignInSignUpSwitch() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>("signin");

  return (
    <Container>
      <SelectedContainer position={activeTab} />
      <ButtonContainer>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setActiveTab("signin")}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setActiveTab("signup")}
        >
          Cadastro
        </Button>
      </ButtonContainer>
    </Container>
  )
}