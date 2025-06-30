import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";
import { Title } from "@/components/@ui/Title";
import { Field, Section } from "./styles";
import { Button } from "@/components/@ui/Button";
import { ArrowsClockwise } from "@phosphor-icons/react";

export function UpdatePassword() {
  return (
    <Section>
      <Title size="sm">Senha</Title>

      <form>
        <Field>
          <Text type="label" size="sm">
            Senha antiga
          </Text>
          <TextInput placeholder="Sua senha antiga" />
        </Field>

        <Field>
          <Text type="label" size="sm">
            Nova senha
          </Text>
          <TextInput placeholder="Sua nova senha" />
        </Field>

        <Button
          type="submit"
          size="sm"
          style={{ width: "fit-content", alignSelf: "end" }}
        >
          <ArrowsClockwise weight="bold" /> Atualizar senha
        </Button>
      </form>
    </Section>
  );
}
