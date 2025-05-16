import { styled } from '@edna-ui/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginLeft: '230px',
  width: '100%',

  '@xl': {
    marginLeft: '200px',
  },

  '@md': {
    marginLeft: '0',
  },
})

export const Main = styled('main', {
  display: 'grid',
  gridTemplateColumns: '4fr 1fr',
  gridTemplateRows: 'auto auto auto',
  gap: '$8',

  width: '100%',

  padding: '$8 $40',

  '@xl': {
    padding: '$8 $12',
  },
  '@md': {
    padding: '$8 $4 $8 $12',
  },
})

export const InfoCardContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  placeItems: 'center',
  gap: '$2',
  width: '100%'
})
