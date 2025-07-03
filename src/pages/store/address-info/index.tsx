import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { Text } from "@/components/@ui/Text";
import { TextArea } from "@/components/@ui/TextArea";
import { TextInput } from "@/components/@ui/TextInput";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { AddressInfoData } from "@/contexts/StoreContext";
import { useStore } from "@/hooks/use-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowsClockwise, CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ProfilePreview } from "../../../components/ProfilePreview";
import {
  Container,
  Field,
  Main,
  RightColumn,
  Section,
} from "../../../styles/stores/address-info/styles";
import { getViaCep } from "@/api/get-via-cep";
import { updateAddress } from "@/api/update-address";

const cepRegex = /^\d{5}-?\d{3}$/;

const AddressInfoSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(cepRegex, "CEP inválido")
    .transform((value) => value.replace("-", "")),
  number: z.string().min(1, "Número é obrigatório"),
  street: z.string().min(1, "Rua é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
});

type AddressInfoFormData = z.infer<typeof AddressInfoSchema>;

export default function AddressInfo() {
  const { getValue } = useStore();

  function getInputValues() {
    const data = getValue("address") as AddressInfoData;

    if (data && Object.keys(data).length > 0) {
      setValue("id", data.id, { shouldValidate: true });
      setValue("number", data.number, { shouldValidate: true });
      setValue("cep", `${data.cep.slice(0, 5)}-${data.cep.slice(5, 8)}`, {
        shouldValidate: true,
      });
      setValue("street", data.street, { shouldValidate: true });
      setValue("neighborhood", data.neighborhood, {
        shouldValidate: true,
      });
      setValue("city", data.city, { shouldValidate: true });
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddressInfoFormData>({
    resolver: zodResolver(AddressInfoSchema),
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

  async function handleUpdateAddressInfo(data: AddressInfoFormData) {
    try {
      await updateAddress(data);

      toast.success("Endereço atualizado com sucesso!");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar endereço!", {
          description: error.response.data.message,
        });
        return;
      }

      toast.error("Erro ao atualizar endereço!", {
        description:
          "Não foi possível atualizar o endereço, tente novamente mais tarde.",
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
      <Header
        title="Brechó"
        description="Essa é a área do perfil do seu brechó, aqui você pode adicionar e alterar informações suas informações."
      />

      <Main>
        <ProfilePreview />

        <RightColumn>
          <Button
            variant="tertiary"
            style={{ width: "fit-content" }}
            onClick={() => router.push("/store")}
          >
            <CaretLeft weight="bold" />
            Voltar
          </Button>

          <Card>
            <Section>
              <Title size="sm" style={{ marginBottom: "16px" }}>
                Endereço
              </Title>

              <form onSubmit={handleSubmit(handleUpdateAddressInfo)}>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Field>
                    <Text type="label" size="sm">
                      CEP
                    </Text>
                    <TextInput
                      placeholder="CEP seu brechó"
                      maxLength={9}
                      {...register("cep")}
                      errorMessage={errors.cep?.message}
                      hasErrorPlaceholder
                    />
                  </Field>

                  <Field>
                    <Text type="label" size="sm">
                      Número
                    </Text>
                    <TextInput
                      placeholder="Número do seu brechó"
                      maxLength={6}
                      {...register("number")}
                      errorMessage={errors.number?.message}
                      hasErrorPlaceholder
                    />
                  </Field>
                </div>

                <Field>
                  <Text type="label" size="sm">
                    Rua
                  </Text>
                  <TextInput
                    placeholder="Rua do seu brechó"
                    maxLength={50}
                    {...register("street")}
                    errorMessage={errors.street?.message}
                    readOnly
                    hasErrorPlaceholder
                  />
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    Bairro
                  </Text>
                  <TextInput
                    placeholder="Bairro do seu brechó"
                    {...register("neighborhood")}
                    errorMessage={errors.neighborhood?.message}
                    readOnly
                    hasErrorPlaceholder
                  />
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    Cidade
                  </Text>
                  <TextInput
                    placeholder="Cidade do seu brechó"
                    {...register("city")}
                    errorMessage={errors.city?.message}
                    readOnly
                    hasErrorPlaceholder
                  />
                </Field>

                <Button
                  size="sm"
                  style={{
                    width: "fit-content",
                    alignSelf: "end",
                  }}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {!isSubmitting ? (
                    <>
                      <ArrowsClockwise weight="bold" /> Atualizar endereço
                    </>
                  ) : (
                    <Spinner color="#FFF6D8" />
                  )}
                </Button>
              </form>
            </Section>
          </Card>
        </RightColumn>
      </Main>
    </Container>
  );
}
