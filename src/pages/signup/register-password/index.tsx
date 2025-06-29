import {
  AlreadyHaveAccountContainer,
  ButtonContainer,
  Container,
  FormTitle,
  InputContainer,
  RegisterPasswordForm,
} from "./styles";

import { Button } from "@/components/@ui/Button";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/router";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/use-signup";

const RegisterPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Senha é obrigatória" })
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
      .max(15, { message: "Senha deve ter no máximo 15 caracteres" }),
    password_confirm: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As senhas não coincidem",
    path: ["password_confirm"],
  });

type RegisterPasswordFormData = z.infer<typeof RegisterPasswordSchema>;

export default function RegisterPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPasswordFormData>({
    resolver: zodResolver(RegisterPasswordSchema),
  });

  const { submitSignUp, email } = useSignUp();

  const router = useRouter();

  async function handleContinue(data: RegisterPasswordFormData) {
    try {
      await submitSignUp(data.password);

      router.push(`/signin?email=${email}`);
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
    }
  }

  return (
    <Container>
      <RegisterPasswordForm onSubmit={handleSubmit(handleContinue)}>
        <FormTitle style={{ alignSelf: "flex-start" }}>Senha</FormTitle>

        <InputContainer>
          <Text type="label" size="xs">
            Senha
          </Text>
          <TextInput
            maxLength={9}
            placeholder="Digite sua senha"
            isPassword
            errorMessage={errors.password?.message}
            hasErrorPlaceholder
            {...register("password")}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Confirmar senha
          </Text>
          <TextInput
            maxLength={9}
            placeholder="Digite novamente sua senha"
            isPassword
            errorMessage={errors.password_confirm?.message}
            hasErrorPlaceholder
            {...register("password_confirm")}
          />
        </InputContainer>

        <ButtonContainer>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Voltar
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Finalizar
          </Button>
        </ButtonContainer>
      </RegisterPasswordForm>

      <AlreadyHaveAccountContainer>
        <div>
          <Text size="sm">Já possui uma conta?</Text>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.push("/signin")}
            disabled={isSubmitting}
          >
            <Text size="sm" weight="bold">
              Entrar
            </Text>
          </Button>
        </div>
      </AlreadyHaveAccountContainer>
    </Container>
  );
}
