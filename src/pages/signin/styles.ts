import { Text } from "@/components/@ui/Text";
import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  paddingTop: '$8',
  gap: '$8',
})

export const LogoImage = styled(Image, {
  width: '160px',
  height: '90px',
  objectFit: 'cover'
})

export const Heading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',

  marginBottom: '$8',

  [`& > ${Text}`]: {
    color: '$base300'
  }
})

export const SignInForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$3'
})

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
})