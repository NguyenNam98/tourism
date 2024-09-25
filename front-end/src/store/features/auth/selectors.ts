// useAppSelector to select token from auth slice

import { useAppDispatch, useAppSelector } from "~/store/hook.ts";

import { logout } from "./slice.ts";

export const useToken = (): string | null => {
  return useAppSelector((state) => state.auth.token);
};

export const useUserInfo = () => {
  const user = useAppSelector((state) => state.auth.user);
  return { user };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
};
