import { Clothe } from "@/api/create-clothe";
import { ButtonContainer } from "./styles";
import { Button } from "@/components/@ui/Button";
import { ArrowsClockwise, Check, Trash } from "@phosphor-icons/react";
import { Spinner } from "@/components/Spinner";

export interface FormActionsProps {
  clothe: Clothe | undefined;
  isSubmitting: boolean;
  handleGoBack: () => void;
  handleDeleteClothe: () => void;
}

export function FormActions({
  clothe,
  isSubmitting,
  handleGoBack,
  handleDeleteClothe,
}: FormActionsProps) {
  return (
    <ButtonContainer>
      {clothe && (
        <Button
          type="button"
          variant="destructive"
          onClick={handleDeleteClothe}
        >
          <Trash weight="bold" />
          Excluir
        </Button>
      )}
      <div>
        <Button type="button" variant="tertiary" onClick={handleGoBack}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {clothe ? (
            <>
              {!isSubmitting ? (
                <>
                  <ArrowsClockwise />
                  Atualizar peça
                </>
              ) : (
                <Spinner color="#FFF6D8" />
              )}
            </>
          ) : (
            <>
              {!isSubmitting ? (
                <>
                  <Check />
                  Cadastrar peça
                </>
              ) : (
                <Spinner color="#FFF6D8" />
              )}
            </>
          )}
        </Button>
      </div>
    </ButtonContainer>
  );
}
