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

export default function GeneralInfo() {
  const { control } = useForm();

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

              <form>
                <Field>
                  <Text type="label" size="sm">
                    Nome
                  </Text>
                  <TextInput placeholder="Nome do seu brechó" />
                </Field>

                <Field>
                  <Text type="label" size="sm">
                    E-mail
                  </Text>
                  <TextInput placeholder="E-mail do seu brechó" />
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
                    <TextInput placeholder="Telefone do seu brechó" />
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
                          // errorMessage={errors.targetCustomer?.message}
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
                  <TextArea placeholder="Descrição do seu brechó" />
                </Field>

                <Button
                  type="submit"
                  size="sm"
                  style={{ width: "fit-content", alignSelf: "end" }}
                >
                  <ArrowsClockwise weight="bold" /> Atualizar informações
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
