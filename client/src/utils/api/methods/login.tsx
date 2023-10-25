/* eslint-disable react-refresh/only-export-components */
import Api from "../axios";
import { loginPayload } from "../../type/payload";
const base = "/login";

export const createLogin = (data: loginPayload) => Api.post(base, data);

export const LoginRequest = (data: loginPayload) => {
  return createLogin(data);
};
