import { styled } from '@edna-ui/react'
import { ComponentProps, ElementType } from 'react'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$sm',
  fontSize: '$sm',
  fontWeight: '$regular',
  fontFamily: '$default',
  textAlign: 'center',
  minWidth: 56,
  boxSizing: 'border-box',
  padding: '$4 $4',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  cursor: 'pointer',

  svg: {
    width: '$4',
    height: '$4',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$black',
  },

  transition: 'background 200ms, color 200ms, border-color 200ms',

  variants: {
    variant: {
      primary: {
        color: '$white',
        background: '$base100',

        '&:not(:disabled):hover': {
          background: '$base200',
        },

        '&:disabled': {
          opacity: '.5',
        },
      },

      secondary: {
        color: '$base100',
        background: '$base500',

        border: '1px solid transparent',

        '&:not(:disabled):hover': {
          borderColor: '$base400',
        },

        '&:disabled': {
          opacity: '.5',
        },
      },

      tertiary: {
        color: '$base100',

        '&:not(:disabled):hover': {
          color: '$base300',
        },

        '&:disabled': {
          opacity: '.5',
        },
      },
    },

    size: {
      sm: {
        height: 38,
      },
      md: {
        height: 53,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}