import { Container, Heading, InputContainer, SignUpForm } from "./styles";

import { Text } from "@/components/@ui/Text";
import { Button } from "@/components/@ui/Button";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { TextInput } from "@/components/@ui/TextInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { SignInSignUpSwitch } from "@/components/SwitchSignInSignUp";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyDuplicateSignUp } from "@/api/verify-duplicate-sign-up";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { use } from "react";
import { useSignUp } from "@/hooks/use-signup";

const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/;

const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .regex(cnpjRegex, "CNPJ inválido")
    .transform((value) => value.replace(/[.\-\/\s+]/g, "")),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido")
    .transform((value) => value.replace(/[(\[)\-\s+]/g, "")),
  targetCustomer: z.enum(['MALE', 'FEMALE', 'ALL'], { message: "Selecione um público alvo" }),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const { registerStore } = useSignUp()

  const router = useRouter()

  const isMobile = useIsMobile()

  async function handleContinue(data: SignUpFormData) {
    try {
      await verifyDuplicateSignUp(data)

      registerStore(data);

      router.push('/signup/register-address')
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
    }
  }

  return (
    <Container>
      <Heading>
        <SpecialTitle size={isMobile ? 'sm' : 'md'}>
          Será um prazer ter o seu brechó na edna!
        </SpecialTitle>
        <Text size={isMobile ? 'xs' : 'sm'}>
          Por favor, insira as informações do seu brechó
        </Text>
      </Heading>

      <SignUpForm onSubmit={handleSubmit(handleContinue)}>
        <SignInSignUpSwitch />
        <InputContainer>
          <Text type="label" size="xs">Nome</Text>
          <TextInput
            maxLength={50}
            placeholder='Ex: Brechó da Edna'
            errorMessage={errors.name?.message}
            hasErrorPlaceholder
            {...register('name')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">CNPJ</Text>
          <TextInput
            maxLength={18}
            placeholder='Ex: 12.345.678/0001-90'
            errorMessage={errors.cnpj?.message}
            hasErrorPlaceholder
            {...register('cnpj')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">E-mail</Text>
          <TextInput
            maxLength={100}
            placeholder='Ex: brechoedna@exemplo.com'
            errorMessage={errors.email?.message}
            hasErrorPlaceholder
            {...register('email')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">Telefone</Text>
          <TextInput
            maxLength={16}
            placeholder='Ex: (48) 9 1234-5678'
            errorMessage={errors.phone?.message}
            hasErrorPlaceholder
            {...register('phone')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">Público alvo</Text>
          <Controller
            name="targetCustomer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                placeholder="Selecionar"
                value={value}
                onValueChange={onChange}
                errorMessage={errors.targetCustomer?.message}
                hasErrorPlaceholder
              >
                <SelectItem value="MALE">Moda Masculina</SelectItem>
                <SelectItem value="FEMALE">Moda Feminina</SelectItem>
                <SelectItem value="ALL">Todos os públicos</SelectItem>
              </SelectInput>
            )}
          />
        </InputContainer>
        <Button disabled={isSubmitting} type='submit' style={{ width: '100%' }}>
          Continuar
        </Button>
      </SignUpForm>
    </Container>
  );
}