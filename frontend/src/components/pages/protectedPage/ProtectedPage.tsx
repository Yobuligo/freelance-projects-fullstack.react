import { Navigate } from "react-router-dom";
import { useSession } from "../../../hooks/useSession";
import { AppRoutes } from "../../../routes/AppRoutes";
import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  return <Page>{props.children}</Page>;
};
