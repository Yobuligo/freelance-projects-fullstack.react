import { Navigate, useNavigate } from "react-router-dom";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import { useLogout } from "../../../hooks/useLogout";
import { useSession } from "../../../hooks/useSession";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { isError } from "../../../shared/utils/isError";
import { ErrorDisplay } from "../../errorDisplay/ErrorDisplay";
import { SpinnerButton } from "../../spinnerButton/SpinnerButton";
import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const [, setErrorMessage] = useErrorMessage();
  const navigate = useNavigate();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      if (isError(error)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(texts.logout.title);
      }
    }
  };

  const onBackToStart = () => {
    setErrorMessage("");
    navigate(AppRoutes.dashboard.toPath());
  };

  return (
    <Page>
      <div className={styles.protectedPage}>
        <div className={styles.header}>
          <div className={styles.backToStart} onClick={onBackToStart}>
            {(props.displayBackToStart === undefined ||
              props.displayBackToStart === true) && (
              <>{t(texts.general.backToStart)}</>
            )}
          </div>

          <SpinnerButton displaySpinner={isLoggingOut} onClick={onLogout}>{`${t(
            texts.logout.title
          )} (${session.username})`}</SpinnerButton>
        </div>
        <ErrorDisplay className={styles.errorDisplay} />
        <div>{props.children}</div>
      </div>
    </Page>
  );
};
