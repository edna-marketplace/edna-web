import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/header";
import {
  CaretRight,
  Clock,
  IdentificationCard,
  MapPin,
  Skull,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { ProfilePreview } from "../../components/ProfilePreview";
import {
  Container,
  DeactivateAccountButton,
  EditInfoButton,
  Main,
  RightColumn,
} from "../../styles/stores/styles";
import Swal from "sweetalert2";
import { destroyCookie } from "nookies";
import { toast } from "sonner";
import { deleteStore } from "@/api/deactivate-store";

export default function Store() {
  const router = useRouter();

  async function handleDeactivateAccount() {
    try {
      Swal.fire({
        title: "Desativar conta!",
        icon: "warning",
        text: "Você não poderá recuparar sua conta. Pagamentos pendentes no Stripe ainda serão repassados.",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim, desejo desativar.",
        confirmButtonColor: "red",
        cancelButtonText: "Não",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteStore();

          toast.success("Conta desativada com sucesso.");
          destroyCookie(null, "@edna:auth-token");
          router.push("/signin");
        }
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao desativar conta!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao desativar conta!", {
        description:
          "Não foi possível desativar a conta, tente novamente mais tarde.",
      });
    }
  }

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
              <IdentificationCard size={28} color="#4F4C42" />

              <div>
                <Title size="sm">Informações gerais</Title>
                <Text size="sm">Informações da loja, imagens e senha</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>

          <EditInfoButton onClick={() => router.push("/store/address-info")}>
            <div>
              <MapPin size={28} color="#4F4C42" />

              <div>
                <Title size="sm">Endereço</Title>
                <Text size="sm">Número, CEP, rua, bairro e cidade</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>

          <EditInfoButton onClick={() => router.push("/store/schedule-info")}>
            <div>
              <Clock size={28} color="#4F4C42" />

              <div>
                <Title size="sm">Horário de atendimento</Title>
                <Text size="sm">Dias e horários de funcionamento</Text>
              </div>
            </div>

            <CaretRight size={30} color="#4F4C42" />
          </EditInfoButton>

          <DeactivateAccountButton onClick={handleDeactivateAccount}>
            <div>
              <Skull size={28} color="red" />

              <div>
                <Title size="sm" style={{ color: "red" }}>
                  Desativar conta
                </Title>
                <Text size="sm" style={{ color: "red" }}>
                  Ao fazer isso você não poderá recuperar sua conta
                </Text>
              </div>
            </div>

            <CaretRight size={30} color="red" />
          </DeactivateAccountButton>
        </RightColumn>
      </Main>
    </Container>
  );
}
