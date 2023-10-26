import { InputFieldProps } from "@/utils/type/formField";
import { useState } from "react";
import { Controller } from "react-hook-form";

const PasswordInputField = (props: InputFieldProps) => {
  const { placeholder, fullWidth, name, validate, required } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      rules={{ required: required && "Required", validate }}
      render={({ field, fieldState: { error: errorField } }) => (
        <>
          <div
            className={`flex items-center ${fullWidth ? "w-full" : "w-fit"}  ${
              errorField ? " border-red-600 border" : "border"
            }`}
          >
            <input
              {...field}
              className={`${
                fullWidth ? "w-full" : "w-fit"
              } p-2 text-xl text-gray-500  rounded-sm outline-none`}
              placeholder={errorField ? "" : placeholder}
              type={showPassword ? "text" : "password"}
            />
            <div
              className="p-3 text-white bg-blue-600 cursor-pointer"
              onClick={handleShowPassword}
            >
              show
            </div>
          </div>
          {errorField && (
            <p className="text-sm text-red-500">Field is required!</p>
          )}
        </>
      )}
      name={name}
    />
  );
};

export default PasswordInputField;
