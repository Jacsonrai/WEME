import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";
import {
  useFormContext,
  FormProvider,
  useForm,
  ValidateResult,
} from "react-hook-form";

interface FormHooksProviderProps {
  children?: ReactNode;
}
interface ReactHooksFormProps
  extends Omit<
      DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
      "onSubmit"
    >,
    ReactHookInputBaseProps {
  onSubmit: (value: any) => Promise<void> | void;
}
interface ReactHookInputBaseProps {
  required?: boolean;
  validate?: (
    value: string | number | boolean | Record<string, unknown> | OptionProps
  ) => ValidateResult | Promise<ValidateResult>;
}
interface OptionProps {
  label: string | Element;
  value: string | number;
  disabled?: boolean;
  key?: string;
  selected?: boolean;
}
export const FormsProvider = (props: FormHooksProviderProps) => {
  const { children, ...rest } = props;

  const method = useForm(rest);
  return <FormProvider {...method}>{children}</FormProvider>;
};
export const HookForm = (props: ReactHooksFormProps) => {
  const { onSubmit, children, ...rest } = props;
  const { handleSubmit } = useFormContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {children}
    </form>
  );
};
