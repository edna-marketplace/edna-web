import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { Container } from "./styles";
import { Header } from "@/components/Header";

export default function Store() {
  return (
    <Container>
      <Header
        title="Brechó"
        description="Essa é a área do seu brechó, aqui você pode adicionar e alterar informações da sua loja."
      />
      <SpecialTitle>Store</SpecialTitle>
    </Container>
  )
}