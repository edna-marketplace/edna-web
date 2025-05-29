import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  height: "100%",

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

export const RegisterPasswordForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '350px',

  '@sm': {
    width: '300px',
  }
})

export const FormTitle = styled(Title, {
  alignSelf: 'flex-start',
  marginBottom: '$4'
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const AlreadyHaveAccountContainer = styled('div', {
  flex: 1,
  display: 'flex',
  alignContent: 'end',
  alignItems: 'flex-end',

  '& > div': {
    display: 'flex',
    alignItems: 'center'
  }
})