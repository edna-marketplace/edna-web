import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";
import { Title } from "@/components/@ui/Title";
import { Field, Section } from "./styles";
import { Button } from "@/components/@ui/Button";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updatePassword } from "@/api/update-password";
import { Spinner } from "@/components/Spinner";

export const UpdatePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "A senha tem no mínimo 6 caracteres"),
    newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da antiga",
    path: ["newPassword"],
  });

type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;

export function UpdatePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  async function handleUpdatePassword(data: UpdatePasswordData) {
    try {
      await updatePassword(data);

      toast.success("Senha atualizada com sucesso!");

      reset();
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar senha!", {
          description: error.response.data.message,
        });
        return;
      }

      toast.error("Erro ao atualizar senha!", {
        description:
          "Não foi possível atualizar a senha, tente novamente mais tarde.",
      });
    }
  }

  return (
    <Section>
      <Title size="sm">Senha</Title>

      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <Field>
          <Text type="label" size="sm">
            Senha antiga
          </Text>
          <TextInput
            placeholder="Sua senha antiga"
            maxLength={15}
            {...register("oldPassword")}
            isPassword
            errorMessage={errors.oldPassword?.message}
            hasErrorPlaceholder
          />
        </Field>

        <Field>
          <Text type="label" size="sm">
            Nova senha
          </Text>
          <TextInput
            placeholder="Sua nova senha"
            maxLength={15}
            {...register("newPassword")}
            isPassword
            errorMessage={errors.newPassword?.message}
            hasErrorPlaceholder
          />
        </Field>

        <Button
          type="submit"
          size="sm"
          style={{ width: "fit-content", alignSelf: "end" }}
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <>
              <ArrowsClockwise weight="bold" /> Atualizar senha
            </>
          ) : (
            <Spinner color="#FFF6D8" />
          )}
        </Button>
      </form>
    </Section>
  );
}
