import { useState } from "react";
import { Button } from "../../../components/button/Button";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { Select } from "../../../components/select/Select";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProviderType } from "../../../shared/types/ProviderType";
import styles from "./ProviderRequestInput.module.scss";

export const ProviderRequestInput: React.FC = () => {
  const [providerType, setProviderType] = useState(ProviderType.Freelance);
  const { t } = useTranslation();

  const onChangeForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const selectOptions = (): ISelectOption[] => {
    const selectOptions: ISelectOption[] = [];
    for (const propName in ProviderType) {
      const propValue: string = (ProviderType as any)[propName];
      selectOptions.push({ key: propValue, text: propValue });
    }
    return selectOptions;
  };

  return (
    <form className={styles.providerRequestInput} onChange={onChangeForm}>
      <div className={styles.input}>
        <label htmlFor="providerType">
          {t(texts.providerRequestInput.providerType)}
        </label>
        <Select
          onSelect={(selectOption) => {
            setProviderType(selectOption.key as ProviderType);
          }}
          selected={{
            key: providerType,
            text: (ProviderType as any)[providerType],
          }}
          options={selectOptions()}
        />
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
