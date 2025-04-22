import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$6',

  width: '230px',
  minHeight: '100vh',

  background: '$base100',
  padding: '$8'
})

export const Link = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  padding: '$3 $4',
  borderRadius: '$sm',

  fontSize: '$lg',

  transition: 'background 0.2s',

  '&:not(:active):hover': {
    cursor: 'pointer',
    background: '$base200'
  },

  variants: {
    isActive: {
      true: {
        color: '$base700',
        background: '$base200',
      },
      false: {
        color: '$base500',
      }
    }
  }
})