import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import styles from "./Login.module.scss";
import { useLoginViewModel } from "./useLoginViewModel";

export const Login: React.FC = () => {
  const viewModel = useLoginViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.login}>
      <Card className={styles.loginCard}>
        <h3 className={styles.headline}>
          {viewModel.loginMode ? t(texts.login.title) : t(texts.login.register)}
        </h3>
        {viewModel.errorMessage && (
          <Card className={styles.errorMessage}>{viewModel.errorMessage}</Card>
        )}
        {viewModel.successMessage && (
          <Card className={styles.successMessage}>
            {viewModel.successMessage}
          </Card>
        )}
        <LabeledInput
          label={t(texts.login.username)}
          onChange={viewModel.setUsername}
          value={viewModel.username}
        />
        <LabeledInput
          disabled={viewModel.disablePassword}
          label={t(texts.login.password)}
          onChange={viewModel.setPassword}
          type="password"
          value={viewModel.password}
        />
        <button
          className={styles.register}
          onClick={viewModel.onToggleLoginMode}
        >
          {viewModel.loginMode
            ? t(texts.login.registerText)
            : t(texts.login.login)}
        </button>
        <div className={styles.footer}>
          <Button
            disabled={viewModel.disableLoginButton}
            onClick={viewModel.onConfirm}
          >
            {viewModel.loginMode
              ? t(texts.login.login)
              : t(texts.login.register)}
          </Button>
          <Button>{t(texts.login.cancel)}</Button>
        </div>
      </Card>
    </div>
  );
};
