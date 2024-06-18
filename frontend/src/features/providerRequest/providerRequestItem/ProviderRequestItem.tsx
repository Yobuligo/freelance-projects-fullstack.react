import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg";
import { Switch } from "../../../components/switch/Switch";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";
import styles from "./ProviderRequestItem.module.scss";
import { useProviderRequestItemViewModel } from "./useProviderRequestItemViewModel";
import colors from "../../../styles/core/colors.module.scss";

export const ProviderRequestItem: React.FC<IProviderRequestItemProps> = (
  props
) => {
  const viewModel = useProviderRequestItemViewModel(props);

  return (
    <div className={styles.providerRequestItem}>
      <DeleteIcon className={styles.deleteIcon} onClick={viewModel.onDelete} />
      <Switch
        checked={props.providerRequest.enabled ?? true}
        onChange={viewModel.onSwitchChanged}
        sliderColor={colors.colorPrimaryDark}
        colorOnState={colors.colorPrimary}
      />
      <div className={styles.providerType}>{viewModel.providerTitle}</div>
      <input
        className={styles.providerUrl}
        disabled={true}
        type="text"
        value={props.providerRequest.providerUrl}
      />
      <input
        className={styles.providerUrl}
        disabled={true}
        type="text"
        value={props.providerRequest.requestTitle ?? ""}
      />
    </div>
  );
};
