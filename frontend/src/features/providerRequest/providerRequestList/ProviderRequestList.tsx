import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProviderRequestItem } from "../providerRequestItem/ProviderRequestItem";
import { IProviderRequestListProps } from "./IProviderRequestListProps";
import styles from "./ProviderRequestList.module.scss";

export const ProviderRequestList: React.FC<IProviderRequestListProps> = (
  props
) => {
  const { t } = useTranslation();
  const items = props.providerRequests.map((providerRequest, index) => (
    <div key={index}>
      <ProviderRequestItem
        providerRequest={providerRequest}
        onDelete={props.onDelete}
      />
    </div>
  ));

  return (
    <>
      {items.length === 0 ? (
        <h3 className={styles.noProviderRequestsMessage}>
          {t(texts.providerRequestList.noProviderRequests)}
        </h3>
      ) : (
        <div className={styles.providerRequestList}>{items}</div>
      )}
    </>
  );
};
