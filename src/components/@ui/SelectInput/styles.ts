import { styled } from '@edna-ui/react'
import * as SelectPrimitive from '@radix-ui/react-select'

export const SelectInputTrigger = styled(SelectPrimitive.Trigger, {
  fontFamily: '$default',

  backgroundColor: '$base700',
  color: '$base100',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',
  padding: '$3 $4',
  userSelect: 'none',

  height: '59px',
  minWidth: '130px',
  width: '100%',

  fontSize: '$sm',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  cursor: 'pointer',

  '&:disabled': {
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

export const SelectInputValue = styled(SelectPrimitive.Value, {
  color: '$base100',

  '&::placeholder': {
    color: '$base500',
  },
})

export const SelectInputIcon = styled(SelectPrimitive.Icon, {
  color: '$base100',
})

export const SelectInputContent = styled(SelectPrimitive.Content, {
  background: '$base700',
  border: '1px solid $base500',
  borderRadius: '$sm',
  overflow: 'hidden',
  width: 'var(--radix-select-trigger-width)',
})

export const SelectInputViewport = styled(SelectPrimitive.Viewport, {
  padding: '$1',
  maxHeight: '360px',
  overflowY: 'auto',
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
