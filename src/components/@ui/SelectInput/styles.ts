import { styled } from '@edna-ui/react'
import * as SelectPrimitive from '@radix-ui/react-select'

export const FloatingLabelContainer = styled('div', {
  position: 'relative',
  backgroundColor: '$base700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '1px solid $base500',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: "$2 0 0 0",

  minWidth: '130px',

  '&:has(button:disabled)': {
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
  zIndex: 1,
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
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '14px',
      }
    }
  }
})

export const SelectInputTrigger = styled(SelectPrimitive.Trigger, {
  fontFamily: '$default',

  backgroundColor: 'transparent',
  color: '$base100',
  borderRadius: 0,
  boxSizing: 'border-box',
  border: 'none',
  padding: '$3 $4',
  userSelect: 'none',

  height: '50px',
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
})

export const SelectInputValue = styled(SelectPrimitive.Value, {
  color: '$base100',
  textAlign: 'left',

  '&[data-placeholder]': {
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
  zIndex: 1,
})

export const SelectInputViewport = styled(SelectPrimitive.Viewport, {
  padding: '$1',
  maxHeight: '360px',
  overflowY: 'auto',
})