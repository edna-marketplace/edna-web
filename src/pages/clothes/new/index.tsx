import { useRouter } from "next/router";

import { Container, Main } from "../../../styles/clothes/new/styles";

import { Header } from "@/components/header";
import { ClotheForm } from "@/components/ClotheForm";
import { NextSeo } from "next-seo";

export default function ClotheDetails() {
  const router = useRouter();

  function handleGoBack() {
    router.push("/clothes");
  }

  return (
    <>
      <NextSeo title="Nova peça | edna" />
      <Container>
        <Header
          title="Peças"
          description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
          goBack={handleGoBack}
        />

        <Main>
          <ClotheForm />
        </Main>
      </Container>
    </>
  );
}
