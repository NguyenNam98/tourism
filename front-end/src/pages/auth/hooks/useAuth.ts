import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TAuth } from "~/entities";
import { ROUTES } from "~/router/routes";
import { AuthService } from "~/services/auth";
import { setUserCredential } from "~/store/features/auth/slice.ts";
import { useAppDispatch } from "~/store/hook.ts";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await AuthService.login({
        email: email,
        password: password,
      });

      if (response.error) {
        setError(response.message ?? "Invalid information");
        message.error(response.message ?? "Invalid information");
      } else {
        localStorage.setItem("userId", response.data.userId);
        updateUserCredential({ user: response.data.userData });
        setError(null);
        navigate(ROUTES.HOME.path);
      }
    } catch (err) {
      const _error = err as Error;
      message.error("Login Error");
      setError(_error?.message ?? "Login error");
    } finally {
      setLoading(false);
    }
  };

  const updateUserCredential = async ({ user }: Pick<TAuth, "user">) => {
    dispatch(setUserCredential({ user, token: {} }));
  };

  const signOut = async () => {
    localStorage.clear();
  };

  return { signIn, signOut, loading, error, updateUserCredential };
};
