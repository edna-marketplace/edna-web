import { styled } from '@edna-ui/react'
import { ComponentProps, ElementType } from 'react'

export const Title = styled('h3', {
  fontFamily: '$default',
  fontWeight: '$bold',
  lineHeight: '$base',
  margin: 0,

  variants: {
    size: {
      xs: { fontSize: '$sm' },
      sm: { fontSize: '$lg' },
      md: { fontSize: '$2xl' },
      lg: { fontSize: '$3xl' },
    },
    color: {
      base100: { color: '$base100' },
      base200: { color: '$base200' },
      base300: { color: '$base300' },
      base400: { color: '$base400' },
      base500: { color: '$base500' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export interface TitleProps extends ComponentProps<typeof Title> {
  as?: ElementType
}
