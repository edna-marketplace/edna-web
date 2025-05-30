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
  gridTemplateColumns: '3fr 1fr',
  gridTemplateRows: '132px auto auto',
  rowGap: '$4',
  columnGap: '$4',

  width: '100%',

  padding: '$6 $40',

  '@xl': {
    padding: '$6 $8',
  },

  '@lg': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto auto auto auto',
    padding: '$6 $8',
  },

  '@md': {
    padding: '$4 $4',
  },
})

export const InfoCardContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  placeItems: 'center',
  gap: '$2',
  width: '100%',

  '@lg': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto auto',
  },
})

export const PendingOrdersContainer = styled('div', {
  gridRow: 'span 3'
})