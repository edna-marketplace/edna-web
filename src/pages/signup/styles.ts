import { Text } from "@/components/@ui/Text";
import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  paddingTop: '$8',
  gap: '$8',
  width: '100%'
})

export const Heading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',

  [`& > ${Text}`]: {
    color: '$base300'
  }
})

export const SignUpForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '350px',

  '@sm': {
    width: '300px',
  }
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
})