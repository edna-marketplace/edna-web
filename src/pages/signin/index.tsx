import { Container, Heading, InputContainer, LogoImage, SignInForm } from "./styles";

import logo from '@/assets/logoImg.png';

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

const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "Preencha o email" })
    .email({ message: "O email deve ser válido" }),
  password: z.string()
    .min(1, { message: "Preencha a senha" })
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  })

  const router = useRouter()

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn(data)

      router.push('/')
    } catch (error) {
      toast.error('E-mail e/ou senha inválidos.')
    }
  }

  return (
    <Container>
      <LogoImage src={logo} alt="" />
      <div>
        <Heading>
          <SpecialTitle size="md">
            Bem-vindo(a) novamente
          </SpecialTitle>
          <Text size="sm">
            Por favor, insira as credenciais do seu brechó
          </Text>
        </Heading>

        <SignInForm onSubmit={handleSubmit(handleSignIn)}>
          <SignInSignUpSwitch />
          <InputContainer>
            <Text type="label" size="xs">E-mail</Text>
            <TextInput
              placeholder='Seu email'
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </InputContainer>

          <InputContainer>
            <Text type="label" size="xs">Senha</Text>
            <TextInput
              placeholder='Sua senha'
              isPassword
              errorMessage={errors.password?.message}
              {...register("password")}
            />
          </InputContainer>
          <Text
            size="xs"
            weight="bold"
            style={{ alignSelf: 'end' }}
          >
            Esqueceu a senha?
          </Text>
          <Button disabled={isSubmitting} type='submit' style={{ width: '100%' }}>Entrar</Button>
        </SignInForm>

      </div>
    </Container>
  )
}