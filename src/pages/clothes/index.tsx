import { SpecialTitle } from "@edna-ui/react";
import { Container } from "./styles";
import { Header } from "@/components/header";

export default function Clothes() {
  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />
      <SpecialTitle>Clothes</SpecialTitle>
    </Container>
  )
}