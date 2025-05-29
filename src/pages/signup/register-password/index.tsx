import { AlreadyHaveAccountContainer, ButtonContainer, Container, FormTitle, Heading, InputContainer, RegisterPasswordForm } from "./styles";

import { Button } from "@/components/@ui/Button";
import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { getViaCep } from "@/api/get-via-cep";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RegisterPasswordSchema = z.object({

});

type RegisterPasswordFormData = z.infer<typeof RegisterPasswordSchema>;

export default function RegisterPassword() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterPasswordFormData>({
    resolver: zodResolver(RegisterPasswordSchema)
  })

  const router = useRouter()

  async function handleContinue(data: RegisterPasswordFormData) {
    try {
      console.log(data)
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
    }
  }

  return (
    <Container>
      <RegisterPasswordForm onSubmit={handleSubmit(handleContinue)}>
        <FormTitle style={{ alignSelf: 'flex-start' }}>
          Senha
        </FormTitle>


        <ButtonContainer>
          <Button type="button" variant="tertiary" onClick={() => router.back()} disabled={isSubmitting}>
            Voltar
          </Button>
          <Button disabled={isSubmitting} type='submit'>
            Continuar
          </Button>
        </ButtonContainer>
      </RegisterPasswordForm>

      <AlreadyHaveAccountContainer>
        <Text size="sm">
          Já possui uma conta?
        </Text>
        <Button type="button" variant="tertiary" onClick={() => router.push('/signin')} disabled={isSubmitting}>
          <Text size="sm" weight="bold">
            Entrar
          </Text>
        </Button>
      </AlreadyHaveAccountContainer>
    </Container>
  );
}