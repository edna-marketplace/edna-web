import {
  ComponentProps,
  forwardRef,
  ElementRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react'
import {
  Input,
  Prefix,
  ShowPasswordButton,
  Suffix,
  TextInputContainer,
} from './styles'
import { Eye, EyeSlash } from 'phosphor-react'

export interface TextInputProps extends ComponentProps<typeof Input> {
  prefix?: string
  suffix?: string
  isPassword?: boolean
  hasError?: boolean
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  (
    { prefix, suffix, isPassword, hasError, css, ...props }: TextInputProps,
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    function handleTogglePassword() {
      setShowPassword((state) => !state)
    }

    return (
      <TextInputContainer css={css} hasError={hasError}>
        {!!prefix && <Prefix>{prefix}</Prefix>}
        <Input
          ref={ref}
          type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
          step={0.01}
          {...props}
        />
        {isPassword && (
          <ShowPasswordButton onClick={() => handleTogglePassword()}>
            {showPassword ? <EyeSlash size={21} /> : <Eye size={21} />}
          </ShowPasswordButton>
        )}
        {!!suffix && <Suffix>{suffix}</Suffix>}
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'Text Input'
