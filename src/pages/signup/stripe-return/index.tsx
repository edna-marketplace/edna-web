import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import {
  Container,
  Heading,
} from "../../../styles/signup/stripe-return/styles";
import { Text } from "@/components/@ui/Text";
import { Button } from "@/components/@ui/Button";
import { ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function StripeReturn() {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Crie sua conta | edna" />
      <Container>
        <Heading>
          <SpecialTitle>Stripe conectado com sucesso!</SpecialTitle>
          <Text>Seja bem-vindo(a) à Edna, aqui seu brechó cresce mais!</Text>
        </Heading>

        <Button onClick={() => router.push("/signin")}>
          Acessar plataforma <ArrowRight />
        </Button>
      </Container>
    </>
  );
}
