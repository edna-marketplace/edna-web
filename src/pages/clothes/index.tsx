import { Container, Main } from "./styles";
import { Header } from "@/components/header";
import { FiltersContainer } from "./components/FiltersContainer";

export default function Clothes() {
  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <FiltersContainer />

      </Main>
    </Container>
  )
}