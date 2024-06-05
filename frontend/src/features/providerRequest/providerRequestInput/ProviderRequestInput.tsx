import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import { Button } from "../../../components/button/Button";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { Select } from "../../../components/select/Select";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { IProviderRequestInputProps } from "./IProviderRequestInputProps";
import styles from "./ProviderRequestInput.module.scss";
import { useProviderRequestInputViewModel } from "./useProviderRequestInputViewModel";

export const ProviderRequestInput: React.FC<IProviderRequestInputProps> = (
  props
) => {
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

      <LabeledInput
        classNameInput={styles.providerUrlInput}
        initialValue={viewModel.providerUrl}
        label={t(texts.providerRequestInput.providerUrl)}
        onChange={viewModel.onChangeProviderUrl}
      />

      <LabeledInput
        classNameInput={styles.requestTitleInput}
        initialValue={viewModel.requestTitle}
        label={t(texts.providerRequestInput.requestTitle)}
        onChange={viewModel.onChangeRequestTitle}
      />

      <Button disabled={!viewModel.isInputValid()} onClick={viewModel.onAdd}>
        <AddIcon
          className={
            viewModel.isInputValid() ? styles.iconEnabled : styles.iconDisabled
          }
        />
      </Button>
    </form>
  );
};
