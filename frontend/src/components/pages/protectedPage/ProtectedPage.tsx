import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../../hooks/useSession";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { Button } from "../../button/Button";
import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session, setSession] = useSession();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  const onLogout = () => {
    setSession(undefined);
    navigate(AppRoutes.login.toPath());
  };

  return (
    <Page>
      <div className={styles.protectedPage}>
        <div className={styles.header}>
          <Button onClick={onLogout}>{t(texts.general.logout)}</Button>
        </div>
        <div>{props.children}</div>
      </div>
    </Page>
  );
};
