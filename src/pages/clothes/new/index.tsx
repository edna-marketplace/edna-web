import { useRouter } from "next/router";

import { Container, Main } from "./styles";

import { Header } from "@/components/Header";
import { ClotheForm } from "../components/ClotheForm";

export default function ClotheDetails() {
  const router = useRouter();

  function handleGoBack() {
    router.push("/clothes");
  }

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
        goBack={handleGoBack}
      />

      <form action="">
        <Main>
          <ClotheForm />
        </Main>
      </form>

    </Container>
  );
}