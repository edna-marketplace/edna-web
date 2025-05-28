import { Card } from "@/components/@ui/Card";
import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const BackgroundImageContainer = styled(Image, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0
})

export const FormContainer = styled(Card, {
  position: 'relative',

  width: '50%',
  minWidth: '270px',
  height: 'fit-content',

  padding: 0,
  margin: '$5',

  '@md': {
    width: '70%'
  },

  '@sm': {
    width: '100%'
  },
})