import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";
import styles from "./ProviderRequestItem.module.scss";

export const ProviderRequestItem: React.FC<IProviderRequestItemProps> = (
  props
) => {
  const onDelete = () => props.onDelete?.(props.providerRequest);

  return (
    <div className={styles.providerRequestItem}>
      <DeleteIcon className={styles.deleteIcon} onClick={onDelete} />
      <div className={styles.providerType}>
        {props.providerRequest.providerType}
      </div>
      <div>{props.providerRequest.providerUrl}</div>
    </div>
  );
};
