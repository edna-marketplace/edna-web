import { ClothesContainer, Container, Main } from "./styles";
import { Header } from "@/components/Header";
import { FilterCard } from "./components/FilterCard";
import { ClotheItem } from "./components/ClotheItem";

export default function Clothes() {
  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <FilterCard />

        <ClothesContainer>
          <ClotheItem />
          <ClotheItem />
          <ClotheItem />
          <ClotheItem />
          <ClotheItem />
          <ClotheItem />
        </ClothesContainer>
      </Main>
    </Container>
  )
}