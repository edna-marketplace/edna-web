import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  padding: '$10 0 $2',
  gap: '$6'
})

export const Heading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',

  [`& > ${Text}`]: {
    color: '$base300'
  }
})

export const RegisterScheduleForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '450px',

  '@md': {
    width: '375px',
  },

  '@sm': {
    width: '330px',
  }
})

export const FormTitle = styled(Title, {
  alignSelf: 'flex-start',
  marginBottom: '$4'
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $base500',
  },
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(40%)',
  },
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const FormError = styled(Text, {
  color: 'red',
  alignSelf: 'flex-start',
  marginLeft: '$3',
  marginBottom: '$4',
})

export const AlreadyHaveAccountContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  marginTop: '$8',
})