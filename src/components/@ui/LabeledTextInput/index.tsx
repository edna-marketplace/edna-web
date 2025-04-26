'use client'

import { Eye, EyeSlash } from 'phosphor-react';
import { ComponentProps, ElementRef, forwardRef, useEffect, useState } from 'react';
import {
  FloatingLabel,
  FloatingLabelContainer,
  Input,
  ShowPasswordButton
} from './styles';

export interface LabeledTextInput extends Omit<ComponentProps<typeof Input>, 'placeholder'> {
  label: string;
  isPassword?: boolean;
}

export const LabeledTextInput = forwardRef<ElementRef<typeof Input>, LabeledTextInput>(
  ({ label, isPassword, css, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const isFloating = isFocused || inputValue !== '';

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value));
      }
    }, [value]);

    function handleTogglePassword() {
      setShowPassword((state) => !state);
    }

    return (
      <FloatingLabelContainer css={css}>
        <FloatingLabel isFloating={isFloating}>
          {label}
        </FloatingLabel>
        <Input
          ref={ref}
          type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
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
              setInputValue(e.target.value);
            }
            props.onChange && props.onChange(e);
          }}
          {...props}
        />
        {isPassword && (
          <ShowPasswordButton onClick={() => handleTogglePassword()}>
            {showPassword ? <EyeSlash size={21} /> : <Eye size={21} />}
          </ShowPasswordButton>
        )}
      </FloatingLabelContainer>
    );
  }
);