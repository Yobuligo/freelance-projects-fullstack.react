import { IProviderRequestItemProps } from "./IProviderRequestItemProps";
import styles from "./ProviderRequestItem.module.scss";

export const ProviderRequestItem: React.FC<IProviderRequestItemProps> = (
  props
) => {
  return (
    <div className={styles.providerRequestItem}>
      <div>{props.providerRequest.providerType}</div>
      <div>{props.providerRequest.url}</div>
    </div>
  );
};
