/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { HookForm, FormsProvider } from "@/components/form/FormProvider";

import { loginPayload } from "@/utils/type/payload";
import { LoginRequest } from "@/utils/api/methods/login";
import PasswordInputField from "@/components/form/PasswordInputField";
import InputField from "@/components/form/InputField";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const handleLoginRequest = (value: loginPayload) => {
    LoginRequest(value).then((res: any) => {
      dispatch({ type: "LOGIN" });
      dispatch({ type: "SET_TOKEN", payload: res?.data.token });
      dispatch({ type: "SET_USER", payload: res?.data.user });
    });
  };
  const defaultValues: loginPayload = {
    email: "",
    password: "",
  };
  const playerRef = useRef();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };
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
                <InputField
                  name="email"
                  placeholder="Emaill Address"
                  fullWidth
                  required
                />
              </div>

              <div className="mb-2">
                <PasswordInputField
                  placeholder="password"
                  name="password"
                  fullWidth
                  required
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
        <div className="mt-2">
          <p className="text-center text-blue-500 cursor-pointer hover:text-blue-700">
            forget password?
          </p>
          <p className="text-center text-blue-500 cursor-pointer hover:text-blue-700">
            <strong>Are you new?</strong> sign up from here
          </p>
        </div>
        <h5 className="mt-2 text-2xl text-center text-gray-500">OR</h5>
        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="p-2 text-lg font-medium text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700">
            <p>Facebook</p>
          </div>
          <div
            onClick={handleGoogleLogin}
            className="p-2 text-lg font-medium text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-700 "
          >
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
