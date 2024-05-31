import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import styles from "./ProviderRequestInput.module.scss";

export const ProviderRequestInput: React.FC = () => {
  const { t } = useTranslation();
  const onChangeForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.providerRequestInput} onChange={onChangeForm}>
      <div className={styles.input}>
        <label htmlFor="providerType">
          {t(texts.providerRequestInput.providerType)}
        </label>
        <input id="providerType" type="text" />
      </div>

      <div className={styles.input}>
        <label htmlFor="providerUrl">
          {t(texts.providerRequestInput.providerUrl)}
        </label>
        <input id="providerUrl" type="text" />
      </div>

      <Button caption={t(texts.providerRequestInput.captionAdd)} />
    </form>
  );
};
