import { useState } from "react";
import { Button } from "../@ui/Button";
import { ButtonContainer, Container, SelectedContainer } from "./styles";
import { useRouter } from "next/router";

export function SignInSignUpSwitch() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(router.pathname === '/signup' ? 'signup' : 'signin');

  function handleTabChange(tab: 'signin' | 'signup') {
    setActiveTab(tab);

    router.push(`/${tab}`);
  }

  return (
    <Container>
      <SelectedContainer position={activeTab} />
      <ButtonContainer>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => handleTabChange("signin")}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => handleTabChange("signup")}
        >
          Cadastro
        </Button>
      </ButtonContainer>
    </Container>
  )
}