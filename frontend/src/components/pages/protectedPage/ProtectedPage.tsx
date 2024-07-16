import { Navigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { useSession } from "../../../hooks/useSession";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { Button } from "../../button/Button";
import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();
  const logout = useLogout();
  const { t } = useTranslation();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  return (
    <Page>
      <div className={styles.protectedPage}>
        <div className={styles.header}>
          <Button onClick={logout}>{`${t(texts.general.logout)} (${
            session.username
          })`}</Button>
        </div>
        <div>{props.children}</div>
      </div>
    </Page>
  );
};
