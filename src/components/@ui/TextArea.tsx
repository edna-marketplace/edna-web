import { styled } from '@edna-ui/react'
import { ComponentProps } from 'react'

export const TextArea = styled('textarea', {
  backgroundColor: '$base700',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',
  width: '100%',

  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base100',
  fontWeight: '$regular',
  resize: 'none',
  minHeight: 80,

  '&:focus': {
    outline: 0,
    boxShadow: '0 0 0 2px $colors$black',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  '&:placeholder': {
    color: '$base400',
  },
})

export type TextAreaProps = ComponentProps<typeof TextArea>