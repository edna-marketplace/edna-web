import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { Text } from "@/components/@ui/Text";
import { Button } from "@/components/@ui/Button";
import { ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import {
  ButtonContainer,
  Container,
  Heading,
  InputContainer,
  StripeRefreshForm,
  WhatsStripeContainer,
} from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/@ui/TextInput";
import { Spinner } from "@/components/Spinner";
import { sendOnboardingLink } from "@/api/send-onboarding-link";
import { toast } from "sonner";

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
      toast.error(JSON.stringify(error.response.data));
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
        <WhatsStripeContainer>
          <Text weight="regular">
            Após você inserir seu e-mail e clicar no botão "Enviar link",
            enviaremos um e-mail contendo o link para você conectar sua conta
            Stripe.
          </Text>
        </WhatsStripeContainer>

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
