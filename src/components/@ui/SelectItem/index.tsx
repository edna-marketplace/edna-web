import { ComponentProps, ElementRef, forwardRef } from 'react'
import * as Select from '@radix-ui/react-select'

import { Item } from './styles'

export type SelectItemProps = ComponentProps<typeof Select.Item>

export const SelectItem = forwardRef<
  ElementRef<typeof Select.Item>,
  SelectItemProps
>(({ children, ...props }: SelectItemProps, ref) => {
  return (
    <Item {...props} ref={ref}>
      <Select.ItemText>{children}</Select.ItemText>
    </Item>
  )
})

SelectItem.displayName = 'Select Item'
