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
  PasswordRecoveryForm,
  WarningContainer,
} from "../../../styles/signin/password-recovery/styles";
import { sendNewPassword } from "@/api/send-new-password";
import { NextSeo } from "next-seo";

const passwordRecoverySchema = z.object({
  email: z
    .string()
    .min(1, { message: "Preencha o email" })
    .email({ message: "O email deve ser válido" }),
});

type PasswordRecoveryForm = z.infer<typeof passwordRecoverySchema>;

export default function PasswordRecovery() {
  const router = useRouter();
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordRecoveryForm>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: email ? email.toString() : undefined,
    },
  });

  async function handleSendNewPasswordEmail(data: PasswordRecoveryForm) {
    try {
      await sendNewPassword(data.email);

      toast.success("E-mail enviado!", {
        description: "Um e-mail foi enviado com sua nova senha.",
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <NextSeo title="Recuperação de senha | edna" />
      <Container>
        <Heading>
          <SpecialTitle>Recuperação de senha</SpecialTitle>
          <Text>Esqueceu sua senha? Não se preocupe, enviaremos uma nova!</Text>
        </Heading>

        <PasswordRecoveryForm>
          <WarningContainer>
            <Text weight="regular">
              Após você inserir seu e-mail e clicar no botão "Enviar senha",
              enviaremos um e-mail contendo sua nova senha.
            </Text>
          </WarningContainer>

          <InputContainer>
            <Text type="label" size="xs">
              E-mail
            </Text>
            <TextInput
              placeholder="Seu email"
              errorMessage={errors.email?.message}
              hasErrorPlaceholder
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
              onClick={handleSubmit(handleSendNewPasswordEmail)}
            >
              {!isSubmitting ? "Enviar senha" : <Spinner color="#FFF6D8" />}
            </Button>
          </ButtonContainer>
        </PasswordRecoveryForm>
      </Container>
    </>
  );
}
