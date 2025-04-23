import { SpecialTitle } from "@edna-ui/react";
import { Container } from "./styles";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <Container>
      <Header
        title="Bem vindo(a)"
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />
      <SpecialTitle>Home</SpecialTitle>
    </Container>
  )
}