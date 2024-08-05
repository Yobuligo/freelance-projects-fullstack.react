import { Spinner } from "../../../components/spinner/Spinner";
import { SpinnerSize } from "../../../components/spinner/SpinnerSize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserProviderRequests } from "../../../hooks/useUserProviderRequests";
import { OpportunityItem } from "../opportunityItem/OpportunityItem";
import styles from "./OpportunityList.module.scss";
import { IOpportunityListProps } from "./OpportunityListProps";

export const OpportunityList: React.FC<IOpportunityListProps> = (props) => {
  const [userProviderRequests] = useUserProviderRequests();
  const { t } = useTranslation();

  const items = props.userOpportunities.map((userOpportunity) => (
    <OpportunityItem
      isSelected={props.selectedUserOpportunity?.id === userOpportunity.id}
      key={userOpportunity.id}
      onChange={props.onChange}
      onSelect={props.onSelectUserOpportunity}
      onChecked={props.onChecked}
      onUnchecked={props.onUnchecked}
      userOpportunity={userOpportunity}
      className={props.listAndItemColorClassName}
    />
  ));

  return (
    <div className={styles.opportunityList}>
      {props.isLoading ? (
        <div className={styles.message}>
          <Spinner color="black" size={SpinnerSize.MEDIUM} />
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className={styles.message}>
              {userProviderRequests.length === 0 ? (
                <>{t(texts.opportunityList.noOpportunitiesExtended)}</>
              ) : (
                <>{t(texts.opportunityList.noOpportunities)}</>
              )}
            </div>
          ) : (
            items
          )}
        </>
      )}
    </div>
  );
};
