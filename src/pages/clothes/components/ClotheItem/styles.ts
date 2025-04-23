import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled('button', {
  all: 'unset',

  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  padding: '$3',

  border: '1px solid transparent',
  borderRadius: '$sm',

  transition: 'background 0.2s, border 0.2s',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$base600',
    borderColor: '$base500',
  }
})

export const ClotheImage = styled(Image, {
  marginBottom: '$1',

  borderRadius: '$sm',
  objectFit: 'cover',
})

export const InfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

export const Dot = styled('div', {
  width: '5px',
  height: '5px',
  borderRadius: '$full',
  backgroundColor: '$base400',
})