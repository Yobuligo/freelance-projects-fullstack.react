import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";
import { useSession } from "./useSession";

export const useLogout = () => {
  const [, setSession] = useSession();
  const navigate = useNavigate();

  const logout = () => {
    setSession(undefined);
    navigate(AppRoutes.login.toPath());
  };

  return logout;
};
