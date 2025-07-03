import { Text } from "@/components/@ui/Text";
import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  padding: '$6',
  gap: '$6',
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
  gap: '$3',

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