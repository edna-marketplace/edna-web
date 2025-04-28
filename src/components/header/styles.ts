import { styled } from '@edna-ui/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '220px',

  background: '$base600',

  padding: '$20 $40 $8',

  '@xl': {
    padding: '$12 $12 $4',
    height: '180px',
  },
  '@md': {
    padding: '$8 $16 $4',
    height: '$40',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  gap: '$2',

  height: '100%',
})

export const GoBackButton = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  width: 'fit-content',
  padding: '$2',
  marginLeft: '-$2',
  marginBottom: '$4',

  borderRadius: '$sm',

  transition: 'background 0.2s',

  '&:hover': {
    cursor: 'pointer',
    background: '$base500',
  },

  '@xl': {
    marginBottom: '0',
  },

  '@md': {
    marginBottom: '-$2',
  },
})
