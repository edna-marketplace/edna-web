import { Card } from '@/components/@ui/Card'
import { styled } from '@edna-ui/react'

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

export const FilterField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})
