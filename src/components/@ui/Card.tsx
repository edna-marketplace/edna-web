import { styled } from '@edna-ui/react'
import { ComponentProps, ElementType } from 'react'

export const Card = styled('div', {
  padding: '$6',
  borderRadius: '$md',
  backgroundColor: '$base600',
  border: '1px solid $base500',
})

export interface CardProps extends ComponentProps<typeof Card> {
  as?: ElementType
}
