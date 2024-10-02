import { useState } from "react";
import { TAuth } from "~/entities";
import { AuthService } from "~/services/auth";
import { setUserCredential } from "~/store/features/auth/slice.ts";
import { useAppDispatch } from "~/store/hook.ts";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await AuthService.login({
        email: email,
        password: password,
      });
      localStorage.setItem("userId", data.data.userId);
      updateUserCredential({ user: {} });
      setError(null);
    } catch (err) {
      const _error = err as Error;
      setError(_error?.message ?? "Login error");
    } finally {
      setLoading(false);
    }
  };

  const updateUserCredential = async ({ user }: Pick<TAuth, "user">) => {
    dispatch(setUserCredential({ user, token: {} }));
  };

  const signOut = async () => {
    // await signOutFirebase(auth)
  };

  return { signIn, signOut, loading, error, updateUserCredential };
};
