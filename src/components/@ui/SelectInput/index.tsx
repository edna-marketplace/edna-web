'use client'

import { ComponentProps, ElementRef, forwardRef, useState, useEffect } from 'react'
import { CaretDown } from 'phosphor-react'
import * as Select from '@radix-ui/react-select'
import {
  FloatingLabel,
  FloatingLabelContainer,
  SelectInputContent,
  SelectInputIcon,
  SelectInputTrigger,
  SelectInputValue,
  SelectInputViewport,
} from './styles'

export interface SelectInputProps extends ComponentProps<typeof Select.Root> {
  css?: any
  placeholder?: string
  label: string
}

export const SelectInput = forwardRef<
  ElementRef<typeof Select.Root>,
  SelectInputProps
>(({ children, placeholder, label, css, value, defaultValue, onValueChange, open, onOpenChange, ...props }: SelectInputProps, ref) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value as string || defaultValue as string || '');
  const isFloating = selectedValue !== '';

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value as string);
    }
  }, [value]);

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <FloatingLabelContainer css={css}>
      <FloatingLabel isFloating={isFloating}>
        {label}
      </FloatingLabel>
      <Select.Root
        {...props}
        value={value as string}
        defaultValue={defaultValue as string}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <SelectInputTrigger ref={ref}>
          <SelectInputValue placeholder={placeholder} />
          <SelectInputIcon>
            <CaretDown size={15} />
          </SelectInputIcon>
        </SelectInputTrigger>

        <Select.Portal>
          <SelectInputContent position="popper" side="bottom" sideOffset={4}>
            <SelectInputViewport>
              <Select.Group>{children}</Select.Group>
            </SelectInputViewport>
          </SelectInputContent>
        </Select.Portal>
      </Select.Root>
    </FloatingLabelContainer>
  )
})

SelectInput.displayName = 'Select Input'