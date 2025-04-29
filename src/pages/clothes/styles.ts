import { Card } from '@/components/@ui/Card'
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

export const FilterContainer = styled(Card, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr',
  alignItems: 'center',
  gap: '$2',

  '@lg': {
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: "auto auto"
  },
  '@md': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: "auto auto"
  }
})

export const ActionsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: 'auto'
})

export const NewClotheContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '$4',
  width: '100%'
})

export const FilterField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$8 $40',

  '@xl': {
    padding: '$8 $12',
  },
  '@md': {
    padding: '$8 $4 $8 $12',
  },
})

export const ClothesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  placeItems: 'center',
  width: '100%',
  '@xl': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  '@lg': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@md': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

export const EmptyListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$1',

  color: '$base400',
})
