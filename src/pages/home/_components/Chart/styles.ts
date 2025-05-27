import { styled } from '@edna-ui/react'
import { Card } from '@/components/@ui/Card'

export const Container = styled(Card, {
    gridColumn: '1 / 2',  
    gridRow: '2 / span 2',  
    padding: '$4',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '$4',
  })
  

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$4',
})

export const Title = styled('h2', {
  fontSize: '$lg',
  fontWeight: '$bold',
  color: '$text',
})

export const PeriodSelector = styled('div', {
  display: 'flex',
  gap: '$2',
})

export const PeriodButton = styled('button', {
  backgroundColor: '$muted',
  borderRadius: '$md',
  padding: '$1 $3',
  fontSize: '$sm',
  fontWeight: '$medium',
  border: 'none',
  cursor: 'pointer',
  color: '$text',

  '&:hover': {
    backgroundColor: '$mutedHover',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$primary',
        color: '$white',
      },
    },
  },
})

export const Legend = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  marginTop: '$2',
})

export const Dot = styled('div', {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#57534e',
})
