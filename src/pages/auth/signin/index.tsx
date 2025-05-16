
import logo from '@/assets/logoImg.png';

import { Container, Heading, LogoImage, SignInForm } from "./styles";
import { SpecialTitle } from '@/components/@ui/SpecialTitle';
import { Text } from '@/components/@ui/Text';
import { Button } from '@/components/@ui/Button';
import { SignInSignUpSwitch } from '@/components/SignInSignUpSwitch';
import { InputContainer } from '@/pages/app/clothes/_components/ClotheForm/styles';
import { TextInput } from '@/components/@ui/TextInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/api/sign-in';

const signInSchema = z.object({
    email: z.string()
        .min(1, { message: "O email é obrigatório" })
        .email({ message: "O email deve ser válido" }),
    password: z.string()
        .min(1, { message: "A senha é obrigatória." })
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema)
    })

    async function handleSignIn(data: SignInForm) {
        await signIn({ 
            email: data.email,
            password: data.password
         })
    }

    return (
        <Container>
            <LogoImage src={logo} alt=""/>
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
                            {...register("email")} 
                        />
                    </InputContainer>
                    <InputContainer>
                        <Text type="label" size="xs">Senha</Text>
                        <TextInput 
                            placeholder='Sua senha' 
                            isPassword
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
                    <Button type='submit' style={{ width: '100%' }}>Entrar</Button>
                </SignInForm>
                
            </div>
        </Container>
    )
}