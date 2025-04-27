import { Card } from "@/components/@ui/Card"
import { Text } from "@/components/@ui/Text"
import { styled } from "@edna-ui/react"

export const FormContainer = styled('form', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$4',

  '@lg': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const FormCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '0',

  '&>div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  }
})

export const Section = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$5 $5 $3',
  marginBottom: '$8',

  background: '$base500',
  borderRadius: '$sm',

  textAlign: 'center',
})

export const Separator = styled('div', {
  width: '100%',
  height: '1px',
  background: '$base500',
  marginBottom: '$8'
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  '&>div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',

    flex: 1,
    justifyContent: 'flex-end',
  },
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  width: '100%',
})

export const ErrorContainer = styled('div', {
  height: '1.5rem',
  margin: '0'
})

export const ErrorPlaceholder = styled('div', {
  height: '1.5rem'
})

export const ErrorMessage = styled('p', {
  color: 'red',
  fontSize: '$sm',
  height: '1.5rem',
})