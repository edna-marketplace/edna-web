import { useRouter } from "next/router";

import { Container, Main } from "../../../styles/clothes/id/styles";

import { Header } from "@/components/header";
import { useEffect, useState } from "react";
import { Clothe } from "@/api/create-clothe";
import { getClotheById } from "@/api/get-clothe-by-id";
import { Form } from "react-hook-form";
import { ClotheForm } from "@/components/ClotheForm";

export default function ClotheDetails() {
  const [clothe, setClothe] = useState<Clothe>();
  const router = useRouter();

  function handleGoBack() {
    router.push("/clothes");
  }

  async function handleGetClotheById() {
    const clotheId = router.query.id as string;

    console.log(clotheId);

    const data = await getClotheById(clotheId);

    setClothe(data);
  }

  useEffect(() => {
    handleGetClotheById();
  }, []);

  return (
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
  );
}
