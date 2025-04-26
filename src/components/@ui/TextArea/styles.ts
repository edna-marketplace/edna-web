
import { styled } from '@edna-ui/react'

export const TextArea = styled('textarea', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base100',
  fontWeight: 'regular',
  background: 'transparent',
  border: 0,
  padding: '$4',
  width: '100%',

  resize: 'none',
  height: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
})

export const FloatingLabelContainer = styled('div', {
  position: 'relative',
  backgroundColor: '$base700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',
  width: '100%',
  padding: "$1 0 0 0",

  '&:has(textarea:focus)': {
    boxShadow: '0 0 0 2px $colors$black',
  },

  '&:has(textarea:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  transition: 'border-color 0.2s',

  '&:not(:disabled):hover': {
    borderColor: '$base400',
  },
})

export const FloatingLabel = styled('label', {
  position: 'absolute',
  left: '$4',
  pointerEvents: 'none',
  fontFamily: '$default',
  color: '$base400',
  userSelect: 'none',

  transition: 'transform 0.2s ease-in-out, font-size 0.2s, top 0.2s ease-in-out',

  variants: {
    isFloating: {
      true: {
        transform: 'translateY(-50%)',
        top: '0',
        fontSize: '$sm',
        backgroundColor: '$base600',
        border: '1px solid $base500',
        borderRadius: '$xs',
        padding: '0 $1',
        left: '11px',
      },
      false: {
        top: '$6',
        transform: 'translateY(-50%)',
        fontSize: '14px',
      }
    }
  }
})