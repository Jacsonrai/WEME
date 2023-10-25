import { useRef, useState } from "react";
import { HookForm, FormsProvider } from "@/components/form/FormProvider";
import { Controller } from "react-hook-form";
import { loginPayload } from "@/utils/type/payload";
import { LoginRequest } from "@/utils/api/methods/login";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginRequest = (value: loginPayload) => {
    LoginRequest(value).then((res) => {
      console.log(res);
    });
  };
  const defaultValues: loginPayload = {
    email: "",
    password: "",
  };
  const playerRef = useRef();
  return (
    <div className="grid grid-cols-2">
      <div className="mt-4">
        <div className="text-center">
          <h6 className=" text-[7rem] uppercase font-semibold leading-[120px] text-gray-600">
            Welcome
          </h6>
          <p className="text-2xl text-gray-500">
            We are glad to see you back with us
          </p>
        </div>
        <div className="flex flex-col justify-center pt-10 pl-10 pr-10">
          <FormsProvider defaultValues={defaultValues}>
            <HookForm
              onSubmit={(value: loginPayload) => handleLoginRequest(value)}
            >
              <div className="mb-2">
                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full p-2 text-xl text-gray-500 border rounded-sm outline-none"
                      placeholder="Email"
                    />
                  )}
                  name="email"
                />
              </div>

              <div className="mb-2">
                <Controller
                  render={({ field }) => (
                    <div className="flex items-center border">
                      <input
                        {...field}
                        className="w-full p-2 text-xl text-gray-500 rounded-sm outline-none"
                        placeholder="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                      />
                      <div
                        className="p-3 text-white bg-blue-600 cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        show
                      </div>
                    </div>
                  )}
                  name="password"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 text-xl text-white bg-blue-400 border outline-none hover:bg-blue-600"
              >
                Login
              </button>
            </HookForm>
          </FormsProvider>
        </div>
        <h5 className="mt-2 text-2xl text-center text-gray-500">OR</h5>
        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="p-2 text-lg font-medium text-white bg-blue-500 rounded-md cursor-pointer">
            <p>Facebook</p>
          </div>
          <div className="p-2 text-lg font-medium text-white bg-red-400 rounded-md cursor-pointer ">
            <p>Google</p>
          </div>
        </div>
      </div>
      <div>
        <div className="w-[100%] h-[100vh] bg-gray-800"></div>
      </div>
    </div>
  );
};

export default Login;
