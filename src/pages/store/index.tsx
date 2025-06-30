import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/Header";
import {
  CaretRight,
  Clock,
  IdentificationCard,
  MapPin,
} from "@phosphor-icons/react";
import { ProfilePreview } from "./_components/ProfilePreview";
import { Container, EditInfoButton, Main, RightColumn } from "./styles";
import { useRouter } from "next/router";

export default function Store() {
  const router = useRouter();

  return (
    <Container>
      <Header
        title="Brechó"
        description="Essa é a área do perfil do seu brechó, aqui você pode adicionar e alterar informações suas informações."
      />

      <Main>
        <ProfilePreview />

        <RightColumn>
          <EditInfoButton onClick={() => router.push("/store/general-info")}>
            <div>
              <IdentificationCard size={32} color="#4F4C42" />

              <div>
                <Title size="sm">Informações gerais</Title>
                <Text size="sm">Nome, email, telefone e imagens</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>

          <EditInfoButton onClick={() => router.push("/store/address")}>
            <div>
              <MapPin size={32} color="#4F4C42" />

              <div>
                <Title size="sm">Endereço</Title>
                <Text size="sm">Número, CEP, rua, bairro e cidade</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>

          <EditInfoButton onClick={() => router.push("/store/schedule")}>
            <div>
              <Clock size={32} color="#4F4C42" />

              <div>
                <Title size="sm">Horário de atendimento</Title>
                <Text size="sm">Dias e horários de funcionamento</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>
        </RightColumn>
      </Main>
    </Container>
  );
}
