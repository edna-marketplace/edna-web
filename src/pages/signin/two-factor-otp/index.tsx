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
  TwoFactorOTPForm,
  WarningContainer,
} from "../../../styles/signin/two-factor-otp/styles";
import { useSignIn } from "@/hooks/use-signin";
import { twoFactorAuth } from "@/api/two-factor-auth";
import { NextSeo } from "next-seo";

const twoFactorOTPSchema = z.object({
  otp: z.string().min(6, "Preencha o código de verificação OTP"),
});

type TwoFactorOTPForm = z.infer<typeof twoFactorOTPSchema>;

export default function TwoFactorOTP() {
  const router = useRouter();

  const { email, password } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TwoFactorOTPForm>({
    resolver: zodResolver(twoFactorOTPSchema),
  });

  async function handleTwoFactorAuth(data: TwoFactorOTPForm) {
    try {
      const otp = data.otp;

      await twoFactorAuth({ email, password, otp });

      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <NextSeo title="Dois fatores | edna" />

      <Container>
        <Heading>
          <SpecialTitle>Verificação de Dois Fatores</SpecialTitle>
          <Text>
            A autenticação com dois fatores aumenta a segurança da plataforma!
          </Text>
        </Heading>

        <TwoFactorOTPForm>
          <WarningContainer>
            <Text weight="regular">
              Foi enviado um e-mail para você com um código OTP, por favor
              insira esse código no campo abaixo.
            </Text>
          </WarningContainer>

          <InputContainer>
            <Text type="label" size="xs">
              Código OTP
            </Text>
            <TextInput
              placeholder="OTP"
              maxLength={6}
              errorMessage={errors.otp?.message}
              hasErrorPlaceholder
              {...register("otp")}
            />
          </InputContainer>

          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(handleTwoFactorAuth)}
            style={{ width: "100%" }}
          >
            {!isSubmitting ? "Entrar" : <Spinner color="#FFF6D8" />}
          </Button>
        </TwoFactorOTPForm>
      </Container>
    </>
  );
}
