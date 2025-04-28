import { ClothesContainer, Container, Main } from "./styles";
import { Header } from "@/components/Header";
import { FilterForm } from "./_components/FilterForm";
import { ClotheItem } from "./_components/ClotheItem";
import { useRouter } from "next/router";
import { ClotheSummary, fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { useEffect, useState } from "react";

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
    console.log(clothes)
  }, [])

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <FilterForm />

        <ClothesContainer>
          {clothes.map((clothe) => (
            <ClotheItem clothe={clothe} onClick={() => handleClotheDetails(clothe.id)} />
          ))}
        </ClothesContainer>
      </Main>
    </Container>
  )
}