import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import { Button } from "../../../components/button/Button";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { LabeledSelect } from "../../../components/labeledSelect/LabeledSelect";
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
      <LabeledSelect
        label={t(texts.providerRequestInput.providerType)}
        onSelect={viewModel.onChangeProviderType}
        options={viewModel.selectOptions}
        selected={viewModel.selectedProviderType}
      />

      <LabeledInput
        classNameInput={styles.providerUrlInput}
        value={viewModel.providerUrl}
        label={t(texts.providerRequestInput.providerUrl)}
        onChange={viewModel.onChangeProviderUrl}
      />

      <LabeledInput
        classNameInput={styles.requestTitleInput}
        value={viewModel.requestTitle}
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
