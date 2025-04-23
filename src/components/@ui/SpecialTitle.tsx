import { styled } from '@edna-ui/react'
import { ComponentProps, ElementType } from 'react'

export const SpecialTitle = styled('h2', {
  fontFamily: '$special',
  lineHeight: '$shorter',
  margin: 0,
  color: '$base100',

  variants: {
    size: {
      sm: { fontSize: '$lg' },
      md: { fontSize: '$2xl' },
      lg: { fontSize: '$3xl' },
      xl: { fontSize: '$4xl' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export interface SpecialTitleProps extends ComponentProps<typeof SpecialTitle> {
  as?: ElementType
}