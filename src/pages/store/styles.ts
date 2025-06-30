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
  gridTemplateColumns: '1fr 1fr',
  gap: '$10',
  padding: '64px $40 $8',

  '@xl': {
    padding: '64px $12 $8',
  },

  '@md': {
    gridTemplateColumns: '1fr',
    padding: '64px $4 $8 $12',
  },
})

export const LeftColumn = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const RightColumn = styled('aside', {
  backgroundColor: '$neutral100',
  padding: '$6',
  borderRadius: '$lg',
  height: 'fit-content',
  boxShadow: '0 0 0 1px $colors$border',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Section = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})
