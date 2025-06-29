import {
  Container,
  Heading,
  InputContainer,
  LogoImage,
  SignInForm,
} from "./styles";

import logo from "@/assets/logoImg.png";

import { Text } from "@/components/@ui/Text";
import { Button } from "@/components/@ui/Button";
import { TextInput } from "@/components/@ui/TextInput";
import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { SignInSignUpSwitch } from "@/components/SwitchSignInSignUp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/api/sign-in";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { getOnboardingStoreStatus } from "@/api/get-onboarding-store-info";
import { VerifyUserType } from "@/api/verify-user-type";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Preencha o email" })
    .email({ message: "O email deve ser válido" }),
  password: z.string().min(1, { message: "Preencha a senha" }),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email ? email.toString() : undefined,
    },
  });

  async function handleSignIn(data: SignInForm) {
    try {
      const { type } = await VerifyUserType(data.email);

      if (type === "CUSTOMER") {
        toast.error("Esse login é exclusivo para brechós!", {
          description:
            "Utilize o aplicativo para celular para realizar login como cliente, ou crie uma conta de brechó.",
        });
        return;
      }

      const { isStripeOnbardingCompleted } = await getOnboardingStoreStatus(
        data.email
      );

      if (!isStripeOnbardingCompleted) {
        router.push(`/signup/stripe-refresh?email=${data.email}`);
        return;
      }

      await signIn(data);

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <Container>
      <LogoImage src={logo} alt="" />
      <div>
        <Heading>
          <SpecialTitle size="md">Bem-vindo(a) novamente</SpecialTitle>
          <Text size="sm">Por favor, insira as credenciais do seu brechó</Text>
        </Heading>

        <SignInForm onSubmit={handleSubmit(handleSignIn)}>
          <SignInSignUpSwitch />
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

          <InputContainer>
            <Text type="label" size="xs">
              Senha
            </Text>
            <TextInput
              placeholder="Sua senha"
              isPassword
              errorMessage={errors.password?.message}
              {...register("password")}
            />
          </InputContainer>
          <Button
            onClick={() => router.push("/signin/password-recovery")}
            type="button"
            size="sm"
            variant="tertiary"
            style={{ alignSelf: "end" }}
          >
            <strong>Esqueceu a senha?</strong>
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            style={{ width: "100%" }}
          >
            Entrar
          </Button>
        </SignInForm>
      </div>
    </Container>
  );
}
