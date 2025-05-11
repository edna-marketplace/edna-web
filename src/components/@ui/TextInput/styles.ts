import { styled } from '@edna-ui/react'

export const TextInputContainer = styled('div', {
  backgroundColor: '$base700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',
  display: 'flex',
  alignItems: 'center',

  width: '100%',

  '&:has(span) input': {
    textAlign: 'center',
  },

  '&:has(input:focus)': {
    boxShadow: '0 0 0 2px $colors$black',
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  transition: 'border-color 0.2s',

  '&:not(:disabled):hover': {
    borderColor: '$base400',
  },

  variants: {
    hasError: {
      true: {
        borderColor: 'red',
      },
    },
  },
})

export const Prefix = styled('span', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base400',
  fontWeight: 'regular',
  padding: '18px',
  height: '57px',
  borderRight: '1px solid $base500',
})

export const Suffix = styled('span', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base400',
  fontWeight: 'regular',
  padding: '18px',
  height: '57px',
  borderLeft: '1px solid $base500',
})

export const ShowPasswordButton = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'center',
  color: '$base400',
  marginRight: '$4',
  cursor: 'pointer',
})

export const Input = styled('input', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$base100',
  fontWeight: 'regular',
  background: 'transparent',
  border: 0,
  padding: '$3 $4',

  height: '57px',
  width: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$base400',
    userSelect: 'none',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '[type="number"]': {
    '-moz-appearance': 'textfield',
  },
})

export const ErrorContainer = styled('div', {
  height: '1.5rem',
  margin: '0',
})

export const ErrorPlaceholder = styled('div', {
  height: '1.5rem',
})

export const ErrorMessage = styled('p', {
  color: 'red',
  fontSize: '$xs',
  height: '1.5rem',
})
