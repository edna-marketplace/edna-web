import { styled } from '@edna-ui/react'
import { ComponentProps, ElementType } from 'react'

export const Text = styled('p', {
  fontFamily: '$default',
  lineHeight: '$base',
  margin: 0,

  variants: {
    size: {
      xxs: { fontSize: '$xxs' },
      xs: { fontSize: '$xs' },
      sm: { fontSize: '$sm' },
      md: { fontSize: '$md' },
      lg: { fontSize: '$xl' },
    },
    type: {
      default: {},
      label: {
        color: '$base300',
        marginBottom: '$1',
        fontWeight: '$bold',
        fontSize: '$sm',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    type: 'default',
  },
})

export interface TextProps extends ComponentProps<typeof Text> {
  as?: ElementType
}
