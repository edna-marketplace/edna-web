import { Card } from "@/components/@ui/Card";
import { FileInput } from "@/components/@ui/FileInput";
import { SelectInput } from "@/components/@ui/SelectInput";
import { SelectItem } from "@/components/@ui/SelectItem";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/Header";
import { ArrowsClockwise, CaretLeft } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { ProfilePreview } from "../_components/ProfilePreview";
import { Container, Field, Main, RightColumn, Section } from "./styles";
import { TextArea } from "@/components/@ui/TextArea";
import { Button } from "@/components/@ui/Button";
import { UpdatePassword } from "../_components/UpdatePassword";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/hooks/use-store";
import { GeneralInfoData } from "@/contexts/StoreContext";
import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";
import { formatCNPJ } from "@/utils/format-cnpj";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { updateStoreInfo } from "@/api/update-store-info";

const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/;

const GeneralInfoSchema = z.object({
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
  targetCustomer: z.enum(["MALE", "FEMALE", "ALL"], {
    message: "Selecione um público alvo",
  }),
  description: z.string().optional().nullable(),
});

type GeneralInfoFormData = z.infer<typeof GeneralInfoSchema>;

export default function GeneralInfo() {
  const { getValue } = useStore();

  function getInputValues() {
    const data = getValue("generalInfo") as GeneralInfoData;

    if (data && Object.keys(data).length > 0) {
      setValue("name", data.name, { shouldValidate: true });
      setValue("cnpj", formatCNPJ(data.cnpj), { shouldValidate: true });
      setValue("email", data.email, { shouldValidate: true });
      setValue("phone", formatPhoneNumber(data.phone), {
        shouldValidate: true,
      });
      setValue("targetCustomer", data.targetCustomer, { shouldValidate: true });
      setValue("description", data.description, { shouldValidate: true });
    }
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GeneralInfoFormData>({
    resolver: zodResolver(GeneralInfoSchema),
  });

  async function handleUpdateGeneralInfo(data: GeneralInfoFormData) {
    try {
      await updateStoreInfo(data);

      toast.success("Informações atualizadas com sucesso!");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar informações!", {
          description: error.response.data.message,
        });
        return;
      }

      toast.error("Erro ao atualizar informações!", {
        description:
          "Não foi possível registrar o brechó, tente novamente mais tarde.",
      });
    }
  }

  useEffect(() => {
    getInputValues();
  }, []);

  return (
    <Container>
      <Header
        title="Brechó"
        description="Essa é a área do perfil do seu brechó, aqui você pode adicionar e alterar informações suas informações."
      />

      <Main>
        <ProfilePreview />

        <RightColumn>
          <Button variant="tertiary" style={{ width: "fit-content" }}>
            <CaretLeft weight="bold" />
            Voltar
          </Button>

          <Card>
            <Section>
              <Title size="sm">Imagens</Title>

              <div>
                <Field>
                  <Text type="label" size="sm">
                    Perfil
                  </Text>
                  <div>
                    <FileInput title="Imagem" contentSize="sm" />
                    <Button size="sm">
                      <ArrowsClockwise weight="bold" />
                    </Button>
                  </div>
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    Banner
                  </Text>
                  <div>
                    <FileInput title="Imagem" contentSize="sm" />
                    <Button size="sm">
                      <ArrowsClockwise weight="bold" />
                    </Button>
                  </div>
                </Field>
              </div>
            </Section>

            <Section>
              <Title size="sm">Informações do brechó</Title>

              <form onSubmit={handleSubmit(handleUpdateGeneralInfo)}>
                <Field>
                  <Text type="label" size="sm">
                    Nome
                  </Text>
                  <TextInput
                    placeholder="Nome do seu brechó"
                    maxLength={50}
                    {...register("name")}
                    errorMessage={errors.name?.message}
                    hasErrorPlaceholder
                  />
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    E-mail
                  </Text>
                  <TextInput
                    placeholder="E-mail do seu brechó"
                    {...register("email")}
                    errorMessage={errors.email?.message}
                    readOnly
                    hasErrorPlaceholder
                  />
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    CNPJ
                  </Text>
                  <TextInput
                    placeholder="CNPJ do seu brechó"
                    {...register("cnpj")}
                    errorMessage={errors.cnpj?.message}
                    readOnly
                    hasErrorPlaceholder
                  />
                </Field>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Field style={{ width: "63%" }}>
                    <Text type="label" size="sm">
                      Telefone
                    </Text>
                    <TextInput
                      placeholder="Telefone do seu brechó"
                      {...register("phone")}
                      errorMessage={errors.phone?.message}
                      hasErrorPlaceholder
                    />
                  </Field>

                  <Field style={{ width: "35%" }}>
                    <Text type="label" size="sm">
                      Público alvo
                    </Text>
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
                  </Field>
                </div>

                <Field>
                  <Text type="label" size="sm">
                    Descrição
                  </Text>
                  <TextArea
                    placeholder="Descrição do seu brechó"
                    maxLength={400}
                    {...register("description")}
                  />
                </Field>

                <Button
                  type="submit"
                  size="sm"
                  style={{
                    width: "fit-content",
                    alignSelf: "end",
                    marginTop: "20px",
                  }}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    <>
                      <ArrowsClockwise weight="bold" /> Atualizar informações
                    </>
                  ) : (
                    <Spinner color="#FFF6D8" />
                  )}
                </Button>
              </form>
            </Section>

            <UpdatePassword />
          </Card>
        </RightColumn>
      </Main>
    </Container>
  );
}
