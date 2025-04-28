import { ComponentProps, ElementRef, forwardRef } from 'react'
import { CaretDown } from 'phosphor-react'
import * as Select from '@radix-ui/react-select'
import {
  SelectInputContent,
  SelectInputIcon,
  SelectInputTrigger,
  SelectInputValue,
  SelectInputViewport,
} from './styles'

export interface SelectInputProps extends ComponentProps<typeof Select.Root> {
  css?: any
  placeholder?: any
  hasError?: boolean
}

export const SelectInput = forwardRef<
  ElementRef<typeof Select.Root>,
  SelectInputProps
>(
  (
    { children, placeholder, hasError, css, ...props }: SelectInputProps,
    ref,
  ) => {
    return (
      <Select.Root {...props}>
        <SelectInputTrigger ref={ref} css={css} hasError={hasError}>
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
    )
  },
)

SelectInput.displayName = 'Select Input'
