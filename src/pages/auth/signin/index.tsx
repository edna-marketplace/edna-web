
import logo from '@/assets/logoImg.png';

import { Container, Heading, LogoImage, SignInForm } from "./styles";
import { SpecialTitle } from '@/components/@ui/SpecialTitle';
import { Text } from '@/components/@ui/Text';
import { Button } from '@/components/@ui/Button';
import { SignInSignUpSwitch } from '@/components/SignInSignUpSwitch';
import { InputContainer } from '@/pages/app/clothes/_components/ClotheForm/styles';
import { TextInput } from '@/components/@ui/TextInput';

export default function SignIn() {
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

                <SignInForm>
                    <SignInSignUpSwitch />
                    <InputContainer>
                        <Text type="label" size="xs">E-mail</Text>
                        <TextInput placeholder='Seu email' />
                    </InputContainer>
                    <InputContainer>
                        <Text type="label" size="xs">Senha</Text>
                        <TextInput placeholder='Sua senha' isPassword />
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