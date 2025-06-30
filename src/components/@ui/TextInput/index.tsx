import { Eye, EyeSlash } from "phosphor-react";
import { ComponentProps, ElementRef, forwardRef, useState } from "react";
import {
  ErrorContainer,
  ErrorMessage,
  ErrorPlaceholder,
  Input,
  Prefix,
  ShowPasswordButton,
  Suffix,
  TextInputContainer,
} from "./styles";

export interface TextInputProps extends ComponentProps<typeof Input> {
  prefix?: string;
  suffix?: string;
  isPassword?: boolean;
  errorMessage?: string;
  hasErrorPlaceholder?: boolean;
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  (
    {
      prefix,
      suffix,
      isPassword,
      errorMessage,
      hasErrorPlaceholder,
      css,
      readOnly,
      ...props
    }: TextInputProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    function handleTogglePassword() {
      setShowPassword((state) => !state);
    }

    return (
      <>
        <TextInputContainer
          css={css}
          hasError={!!errorMessage}
          isReadOnly={readOnly}
        >
          {!!prefix && <Prefix>{prefix}</Prefix>}
          <Input
            ref={ref}
            type={
              isPassword ? (showPassword ? "text" : "password") : props.type
            }
            step={0.01}
            {...props}
          />
          {isPassword && (
            <ShowPasswordButton
              type="button"
              onClick={() => handleTogglePassword()}
            >
              {!showPassword ? <EyeSlash size={21} /> : <Eye size={21} />}
            </ShowPasswordButton>
          )}
          {!!suffix && <Suffix>{suffix}</Suffix>}
        </TextInputContainer>
        {hasErrorPlaceholder &&
          (errorMessage ? (
            <ErrorContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorContainer>
          ) : (
            <ErrorPlaceholder />
          ))}
      </>
    );
  }
);

TextInput.displayName = "Text Input";
