import { Header } from "@/components/Header";
import { Container } from "./styles";
import { useRouter } from "next/router";

export default function ClotheDetails() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
        goBack={handleGoBack}
      />
    </Container>
  );
}