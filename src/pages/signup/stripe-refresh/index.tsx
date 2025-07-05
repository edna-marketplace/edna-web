import { sendOnboardingLink } from "@/api/send-onboarding-link";
import { Button } from "@/components/@ui/Button";
import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";
import { Spinner } from "@/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  ButtonContainer,
  Container,
  Heading,
  InputContainer,
  StripeRefreshForm,
  WarningContainer,
} from "../../../styles/signup/stripe-refresh/styles";

const stripeRefreshSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Preencha o email" })
    .email({ message: "O email deve ser válido" }),
});

type StripeRefreshForm = z.infer<typeof stripeRefreshSchema>;

export default function StripeReturn() {
  const router = useRouter();
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StripeRefreshForm>({
    resolver: zodResolver(stripeRefreshSchema),
    defaultValues: {
      email: email ? email.toString() : undefined,
    },
  });

  async function handleSendOnboardingUrl(data: StripeRefreshForm) {
    try {
      await sendOnboardingLink(data.email);

      toast.success("E-mail enviado!", {
        description:
          "Um e-mail foi enviado com o link para conexão com o Stripe.",
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao conectar conta Stripe!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao conectar conta Stripe!", {
        description:
          "Não foi possível conectar a conta Stripe, tente novamente mais tarde.",
      });
    }
  }

  return (
    <Container>
      <Heading>
        <SpecialTitle>Conecte sua conta Stripe!</SpecialTitle>
        <Text>
          Para finalizar seu cadastro você deve conectar sua conta Stripe.
        </Text>
      </Heading>

      <StripeRefreshForm>
        <WarningContainer>
          <Text weight="regular">
            Após você inserir seu e-mail e clicar no botão "Enviar link",
            enviaremos um e-mail contendo o link para você conectar sua conta
            Stripe.
          </Text>
        </WarningContainer>

        <InputContainer>
          <Text type="label" size="xs">
            E-mail
          </Text>
          <TextInput
            placeholder="Seu email"
            errorMessage={errors.email?.message}
            {...register("email")}
          />
        </InputContainer>

        <ButtonContainer>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.push("/signin")}
            disabled={isSubmitting}
          >
            Fazer login
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(handleSendOnboardingUrl)}
          >
            {!isSubmitting ? "Enviar link" : <Spinner color="#FFF6D8" />}
          </Button>
        </ButtonContainer>
      </StripeRefreshForm>
    </Container>
  );
}
