import { ComponentProps, ElementRef, forwardRef, useState } from "react";
import { toast } from "sonner";
import {
  ErrorContainer,
  ErrorMessage,
  ErrorPlaceholder,
  FileInputContainer,
  Input,
  Label,
  FileCountIndicator,
} from "./styles";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";

export interface FileInputProps extends ComponentProps<typeof Input> {
  id?: string;
  title?: string;
  isMultiple?: boolean;
  hasFileCounter?: boolean;
  contentSize?: "sm" | "md";
  maxFiles?: number;
  maxSizeInMB?: number;
  errorMessage?: string;
  hasErrorPlaceholder?: boolean;
}

export const FileInput = forwardRef<ElementRef<typeof Input>, FileInputProps>(
  (
    {
      id,
      title = "Escolher fotos",
      contentSize = "md",
      isMultiple = true,
      hasFileCounter = false,
      css,
      maxFiles = 5,
      maxSizeInMB = 5,
      onChange,
      value: _value,
      errorMessage,
      hasErrorPlaceholder,
      ...props
    }: FileInputProps,
    ref
  ) => {
    const [fileCount, setFileCount] = useState(0);
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      setFileCount(files ? files.length : 0);

      if (files && files.length > maxFiles) {
        toast.error(`Você pode adicionar no máximo ${maxFiles} imagens.`);
        event.target.value = "";
        setFileCount(0);
        return;
      }

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSizeInBytes) {
            toast.error(
              `A imagem "${files[i].name}" excedeu o limite de ${maxSizeInMB}MB.`
            );
            event.target.value = "";
            setFileCount(0);
            return;
          }
        }
      }

      if (onChange) {
        onChange(event);
      }
    };

    const inputId =
      id || `file-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <>
        <FileInputContainer css={css} hasError={!!errorMessage}>
          <Label size={contentSize} htmlFor={inputId}>
            <UploadSimple size={17} />
            {title}
          </Label>
          {fileCount > 0 && hasFileCounter && (
            <FileCountIndicator>{fileCount}</FileCountIndicator>
          )}
          <Input
            id={inputId}
            ref={ref}
            type="file"
            multiple={isMultiple}
            accept=".jpeg,.jpg,.png"
            onChange={handleFileChange}
            style={{ display: "none" }}
            {...props}
          />
        </FileInputContainer>
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

FileInput.displayName = "File Input";
