import { Collapse } from "../../../components/collapse/Collapse";
import { Switch } from "../../../components/switch/Switch";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import colors from "../../../styles/colors.module.scss";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";
import styles from "./ProviderRequestItem.module.scss";
import { useProviderRequestItemViewModel } from "./useProviderRequestItemViewModel";

export const ProviderRequestItem: React.FC<IProviderRequestItemProps> = (
  props
) => {
  const viewModel = useProviderRequestItemViewModel(props);

  return (
    <div>
      <div className={styles.providerRequestItem}>
        <Collapse
          collapsed={viewModel.collapsed}
          setCollapsed={viewModel.setCollapsed}
        />
        <DeleteIcon onClick={viewModel.onDelete} />
        <Switch
          checked={props.userProviderRequest.enabled ?? true}
          onChange={viewModel.onSwitchChanged}
          sliderColor={colors.colorPrimaryDark}
          colorOnState={colors.colorPrimary}
        />
        <div className={styles.providerType}>{viewModel.providerTitle}</div>
        <div className={styles.providerTitle}>
          {props.userProviderRequest.title ?? ""}
        </div>
      </div>
      {!viewModel.collapsed && (
        <div className={styles.providerUrl}>
          {props.userProviderRequest.url}
        </div>
      )}
    </div>
  );
};
