import { FieldError } from "react-hook-form";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: FieldError
}