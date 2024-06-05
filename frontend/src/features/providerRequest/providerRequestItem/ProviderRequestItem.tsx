import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";
import styles from "./ProviderRequestItem.module.scss";

export const ProviderRequestItem: React.FC<IProviderRequestItemProps> = (
  props
) => {
  const providerDetails = useProviderDetails();
  const onDelete = () => props.onDelete?.(props.providerRequest);

  const providerTitle = providerDetails.findByType(
    props.providerRequest.providerType
  );

  return (
    <div className={styles.providerRequestItem}>
      <DeleteIcon className={styles.deleteIcon} onClick={onDelete} />
      <div className={styles.providerType}>{providerTitle}</div>
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
