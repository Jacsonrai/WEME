import { Controller } from "react-hook-form";
import { InputFieldProps } from "@/utils/type/formField";
const InputField = (props: InputFieldProps) => {
  const { placeholder, fullWidth, name, validate, required } = props;
  return (
    <Controller
      rules={{ required: required && "Required", validate }}
      render={({ field, fieldState: { error: errorField } }) => (
        <>
          <input
            {...field}
            className={`${
              fullWidth ? "w-full" : "w-fit"
            } p-2 text-xl text-gray-500 ${
              errorField ? " border-red-600 border" : "border"
            } rounded-sm outline-none`}
            placeholder={errorField ? "" : placeholder}
          />
          {errorField && (
            <p className="text-sm text-red-500">Field is required!</p>
          )}
        </>
      )}
      name={name}
    />
  );
};

export default InputField;
