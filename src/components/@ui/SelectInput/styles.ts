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

  height: '55px',
  width: '100%',

  fontSize: '$sm',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  cursor: 'pointer',

  transition: 'border-color 0.2s',

  '&:not(:disabled):hover': {
    borderColor: '$base400',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
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
