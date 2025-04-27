import { styled } from "@edna-ui/react"

export const FileInputContainer = styled('div', {
  backgroundColor: '$base700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flex: 1,
  maxWidth: '200px',
  minWidth: '160px',

  '&:has(input:change)': {
    boxShadow: '0 0 0 2px $colors$black',
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  transition: 'border-color 0.2s',

  '&:not(:disabled):hover': {
    borderColor: '$base400',
    cursor: 'pointer',
  },

  variants: {
    hasError: {
      true: {
        borderColor: 'red'
      },
    }
  }
})

export const Input = styled('input', {
  display: 'none',
})

export const Label = styled('label', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base100',
  fontWeight: 'regular',
  background: 'transparent',
  padding: '$3 $4',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    borderColor: '$base400',
    cursor: 'pointer',
  },
})