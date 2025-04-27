import { ComponentProps, ElementRef, forwardRef, useEffect, useState } from 'react';
import {
  FloatingLabel,
  FloatingLabelContainer,
  TextArea,
} from './styles';

export interface LabeledTextArea extends Omit<ComponentProps<typeof TextArea>, 'placeholder'> {
  label: string;
}

export const LabeledTextArea = forwardRef<ElementRef<typeof TextArea>, LabeledTextArea>(
  ({ label, css, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [textareaValue, setTextAreaValue] = useState(value || '');
    const isFloating = isFocused || textareaValue !== '';

    useEffect(() => {
      if (value !== undefined) {
        setTextAreaValue(String(value));
      }
    }, [value]);

    return (
      <FloatingLabelContainer css={css}>
        <FloatingLabel isFloating={isFloating}>
          {label}
        </FloatingLabel>
        <TextArea
          ref={ref}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur && props.onBlur(e);
          }}
          onChange={(e) => {
            if (value === undefined) {
              setTextAreaValue(e.target.value);
            }
            props.onChange && props.onChange(e);
          }}
          {...props}
        />
      </FloatingLabelContainer>
    );
  }
);