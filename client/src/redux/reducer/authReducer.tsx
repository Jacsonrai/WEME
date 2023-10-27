/* eslint-disable @typescript-eslint/no-explicit-any */
const token: string | null = localStorage.getItem("_weme_token") ?? null;

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any;
}
const authState = {
  isLoggedIn: !!token,
  token: token,
  user: null,
};
export const authReducer = (state: AuthState = authState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_TOKEN":
      localStorage.setItem("_weme_token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
