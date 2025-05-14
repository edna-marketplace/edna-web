import { Clothe } from "@/api/create-clothe"
import { ButtonContainer } from "./styles"
import { Button } from "@/components/@ui/Button"
import { ArrowsClockwise, Check, Trash } from "@phosphor-icons/react"

export interface FormActionsProps {
  clothe: Clothe | undefined
  isSubmitting: boolean
  handleGoBack: () => void
  handleDeleteClothe: () => void
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
              <ArrowsClockwise />
              Atualizar peça
            </>
          ) : (
            <>
              <Check />
              Cadastrar peça
            </>
          )}
        </Button>
      </div>
    </ButtonContainer>
  )
}