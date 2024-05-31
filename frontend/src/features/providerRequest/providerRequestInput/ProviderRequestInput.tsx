import { Button } from "../../../components/button/Button";
import { Select } from "../../../components/select/Select";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { IProviderRequestInputProps } from "./IProviderRequestInputProps";
import styles from "./ProviderRequestInput.module.scss";
import { useProviderRequestInputViewModel } from "./useProviderRequestInputViewModel";

export const ProviderRequestInput: React.FC<IProviderRequestInputProps> = (props) => {
  const viewModel = useProviderRequestInputViewModel(props);
  const { t } = useTranslation();

  return (
    <form
      className={styles.providerRequestInput}
      onChange={viewModel.onChangeForm}
    >
      <div className={styles.input}>
        <label htmlFor="providerType">
          {t(texts.providerRequestInput.providerType)}
        </label>
        <Select
          onSelect={viewModel.onChangeProviderType}
          selected={viewModel.selectedProviderType}
          options={viewModel.selectOptions}
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="providerUrl">
          {t(texts.providerRequestInput.providerUrl)}
        </label>
        <input
          id="providerUrl"
          onChange={viewModel.onChangeProviderUrl}
          type="text"
          value={viewModel.providerUrl}
        />
      </div>

      <Button
        caption={t(texts.providerRequestInput.captionAdd)}
        disabled={!viewModel.isInputValid()}
        onClick={viewModel.onAdd}
      />
    </form>
  );
};
