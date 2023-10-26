import type { ValidateResult } from "react-hook-form";
export interface InputFieldProps {
    placeholder?: string;
    fullWidth?: boolean;
    name: string;
    required?: boolean;
    validate?: (
        value: string | number | boolean | Record<string, any> | OptionProps
    ) => ValidateResult | Promise<ValidateResult>;
}
export interface OptionProps {
    label: string | Element;
    value: string | number;
    disabled?: boolean;
    key?: string;
    selected?: boolean;

}