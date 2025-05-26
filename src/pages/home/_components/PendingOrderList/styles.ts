import { styled } from '@edna-ui/react'
import { Card } from '@/components/@ui/Card'

export const Container = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  padding: '$4',
  gap: '$6',
  minWidth: '260px',
  width: '100%',
})

export const OrderItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '&:not(:last-child)::after': {
    content: '""',
    width: '100%',
    height: '1px',
    backgroundColor: '$base500',
    marginTop: '$2',
    alignSelf: 'center',
  },
})
