import {
  AlreadyHaveAccountContainer,
  ButtonContainer,
  Container,
  FormTitle,
  Heading,
  InputContainer,
  RegisterAddressForm,
} from "./styles";

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
import { useSignUp } from "@/hooks/use-signup";
import { verifyDuplicateAddress } from "@/api/verify-duplicate-address";
import { AddressInfo } from "@/api/sign-up";
import { Spinner } from "@/components/Spinner";

const cepRegex = /^\d{5}-?\d{3}$/;

const RegisterAddressSchema = z.object({
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(cepRegex, "CEP inválido")
    .transform((value) => value.replace("-", "")),
  number: z.number().min(1, "Número é obrigatório"),
  street: z.string().min(1, "Rua é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
});

type RegisterAddressFormData = z.infer<typeof RegisterAddressSchema>;

export default function RegisterAddress() {
  const { registerAddress, getValue } = useSignUp();

  function getInputValues() {
    const data = getValue("addressInfo") as AddressInfo;

    if (data && Object.keys(data).length > 0) {
      setValue("cep", data.cep, { shouldValidate: true });
      setValue("number", data.number, { shouldValidate: true });
      setValue("street", data.street, { shouldValidate: true });
      setValue("neighborhood", data.neighborhood, { shouldValidate: true });
      setValue("city", data.city, { shouldValidate: true });
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAddressFormData>({
    resolver: zodResolver(RegisterAddressSchema),
  });

  const router = useRouter();

  const cepValue = watch("cep");

  async function getCep() {
    const formattedCepValue = cepValue && cepValue.replace("-", "");

    if (formattedCepValue && formattedCepValue.length === 8) {
      const data = await getViaCep(cepValue);

      if (data.logradouro && data.bairro && data.localidade) {
        setValue("street", data.logradouro, { shouldValidate: true });
        setValue("neighborhood", data.bairro, { shouldValidate: true });
        setValue("city", data.localidade, { shouldValidate: true });
      } else {
        setValue("street", "");
        setValue("neighborhood", "");
        setValue("city", "");

        setError("street", {
          message: "CEP não encontrado - Rua é obrigatória",
        });
        setError("neighborhood", {
          message: "CEP não encontrado - Bairro é obrigatório",
        });
        setError("city", {
          message: "CEP não encontrado - Cidade é obrigatória",
        });
      }
    }
  }

  async function handleContinue(data: RegisterAddressFormData) {
    try {
      await verifyDuplicateAddress(data);

      registerAddress(data);

      router.push("/signup/register-schedule");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao registrar endereço!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao registrar endereço!", {
        description:
          "Não foi possível registrar o endereço, tente novamente mais tarde.",
      });
    }
  }

  useEffect(() => {
    getInputValues();
  }, []);

  useEffect(() => {
    getCep();
  }, [cepValue]);

  return (
    <Container>
      <RegisterAddressForm onSubmit={handleSubmit(handleContinue)}>
        <FormTitle style={{ alignSelf: "flex-start" }}>Endereço</FormTitle>

        <InputContainer>
          <Text type="label" size="xs">
            CEP
          </Text>
          <TextInput
            maxLength={9}
            placeholder="Ex: 88064-001"
            errorMessage={errors.cep?.message}
            hasErrorPlaceholder
            {...register("cep")}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Número
          </Text>
          <TextInput
            maxLength={6}
            type="number"
            placeholder="Ex: 1234"
            errorMessage={errors.number?.message}
            hasErrorPlaceholder
            {...register("number", { valueAsNumber: true })}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Rua
          </Text>
          <TextInput
            maxLength={100}
            placeholder="Ex: Rodovia Baldicero Filomeno"
            errorMessage={errors.street?.message}
            hasErrorPlaceholder
            readOnly
            {...register("street")}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Bairro
          </Text>
          <TextInput
            maxLength={16}
            placeholder="Ex: Ribeirão da Ilha"
            errorMessage={errors.neighborhood?.message}
            hasErrorPlaceholder
            readOnly
            {...register("neighborhood")}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Cidade
          </Text>
          <TextInput
            maxLength={16}
            placeholder="Ex: Florianópolis"
            errorMessage={errors.city?.message}
            hasErrorPlaceholder
            readOnly
            {...register("city")}
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
          <Button
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
          >
            {!isSubmitting ? "Continuar" : <Spinner color="#FFF6D8" />}
          </Button>
        </ButtonContainer>
      </RegisterAddressForm>

      <AlreadyHaveAccountContainer>
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
      </AlreadyHaveAccountContainer>
    </Container>
  );
}
