import { ClothesContainer, Container, EmptyListContainer, Main } from "./styles";
import { Header } from "@/components/Header";
import { FilterForm } from "./_components/FilterForm";
import { ClotheItem } from "./_components/ClotheItem";
import { useRouter } from "next/router";
import { ClotheSummary, fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { useEffect, useState } from "react";
import { Title } from "@/components/@ui/Title";
import { CoatHanger } from "@phosphor-icons/react/dist/ssr";
import { Text } from "@/components/@ui/Text";

export default function Clothes() {
  const [clothes, setClothes] = useState<ClotheSummary[]>([])

  const router = useRouter()

  function handleClotheDetails(clotheId: string) {
    router.push(`/clothes/${clotheId}`)
  }

  async function handleFetchClothesWithFilter() {
    const data = await fetchClothesWithFilter()
    setClothes(data.clothes)
  }

  useEffect(() => {
    handleFetchClothesWithFilter()
  }, [])

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <FilterForm />

        {clothes.length > 0 ? (
          <ClothesContainer>
            {clothes.map((clothe) => (
              <ClotheItem clothe={clothe} onClick={() => handleClotheDetails(clothe.id)} />
            ))}
          </ClothesContainer>
        ) : (
          <EmptyListContainer>
            <Title>
              Nenhuma peça por aqui!
            </Title>
            <Text>
              Adicione uma nova peça clicando no botão acima
            </Text>
          </EmptyListContainer>
        )}
      </Main>
    </Container >
  )
}