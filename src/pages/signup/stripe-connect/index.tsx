import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import {
  ButtonContainer,
  Container,
  FormContainer,
  FormTitle,
  Heading,
  WhatsStripeContainer,
} from "./styles";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Text } from "@/components/@ui/Text";
import { useSignUp } from "@/hooks/use-signup";
import { useEffect } from "react";
import { Title } from "@/components/@ui/Title";
import { Button } from "@/components/@ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function StripeConnect() {
  const { getValue } = useSignUp();

  const isMobile = useIsMobile();

  function handleConnectStripe() {
    const url = getValue("onboardingUrl") as string;

    window.location.href = url;
  }

  useEffect(() => {
    const url = getValue("onboardingUrl");

    console.log(url);
  }, []);

  return (
    <Container>
      <Heading>
        <SpecialTitle>Quase lá!</SpecialTitle>
        <Text>A última etapa é conectar com o Stripe.</Text>
      </Heading>

      <FormContainer>
        <FormTitle>Pagamentos</FormTitle>

        <WhatsStripeContainer>
          <Title size={isMobile ? "sm" : "sm"}>O que é o Stripe?</Title>
          <Text size={isMobile ? "sm" : "sm"} weight="regular">
            Usamos o Stripe para processar os pagamentos das suas peças vendidas
            de forma segura. Com ele, você recebe o valor das suas vendas
            diretamente na sua conta bancária, sem complicações.
          </Text>
        </WhatsStripeContainer>

        <ButtonContainer>
          <Text>Stripe</Text>

          <Button size="sm" variant="secondary" onClick={handleConnectStripe}>
            Conectar
            <ArrowRight />
          </Button>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
}
