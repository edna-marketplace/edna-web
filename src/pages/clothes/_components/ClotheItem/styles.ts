import { styled } from '@edna-ui/react'
import Image from 'next/image'

export const Container = styled('button', {
  all: 'unset',

  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  maxWidth: '170px',
  padding: '$3',

  border: '1px solid transparent',
  borderRadius: '$sm',

  transition: 'background 0.2s, border 0.2s',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$base600',
    borderColor: '$base500',
  },

  '@sm': {
    '.price': {
      fontSize: "$md"
    }
  }
})

export const ClotheImage = styled(Image, {
  marginBottom: '$1',

  border: '1px solid $base500',
  borderRadius: '$sm',

  objectFit: 'cover',

  '@media(max-width: 450px)': {
    width: "120px",
    height: "120px"
  }
})

export const InfoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  '@sm': {
    fontSize: "$xs"
  }
})

export const Dot = styled('div', {
  width: '5px',
  height: '5px',
  borderRadius: '$full',
  backgroundColor: '$base400',
})
