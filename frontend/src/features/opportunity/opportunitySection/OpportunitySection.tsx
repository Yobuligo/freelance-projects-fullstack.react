import { ReactComponent as CheckAllIcon } from "../../../assets/check-all.svg";
import { ReactComponent as CheckOldIcon } from "../../../assets/check-old.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/reload.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Settings } from "../../settings/settings/Settings";
import { OpportunityIFrame } from "../opportunityIFrame/OpportunityIFrame";
import { OpportunityList } from "../opportunityList/OpportunityList";
import { OpportunitySubList } from "../opportunitySubList/OpportunitySubList";
import styles from "./OpportunitySection.module.scss";
import { useOpportunitySectionViewModel } from "./useOpportunitySectionViewModel";

/**
 * This component is responsible for creating a opportunity section
 */
export const OpportunitySection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useOpportunitySectionViewModel();

  useInitialize(viewModel.loadUserOpportunities);

  return (
    <div className={styles.opportunitySection}>
      <Toolbar
        className={styles.toolbar}
        rightChildren={
          <Button onClick={viewModel.onToggleDisplaySettings}>
            <SettingsIcon className={styles.icon} />
          </Button>
        }
      >
        <Button onClick={viewModel.onReload}>
          <ReloadIcon className={styles.icon} />
        </Button>
        <Button onClick={viewModel.onCheckAll}>
          <CheckAllIcon className={styles.icon} />
        </Button>
        <Button onClick={viewModel.onCheckOld}>
          <CheckOldIcon className={styles.icon} />
          {t(texts.opportunitySection.tickOld)}
        </Button>
      </Toolbar>

      {viewModel.displaySettings && (
        <div className={styles.settingsSection}>
          <Settings />
        </div>
      )}
      <div
        className={
          viewModel.needsDisplaySelectedUserOpportunity
            ? styles.listsSection
            : ""
        }
      >
        <div>
          <OpportunityList
            isLoading={viewModel.isProcessing}
            onChange={viewModel.onUserOpportunityChanged}
            onChecked={viewModel.onUserOpportunityChecked}
            onSelectUserOpportunity={viewModel.onSelectUserOpportunity}
            onUnchecked={viewModel.onUserOpportunityUnchecked}
            userOpportunities={viewModel.openUserOpportunities}
            selectedUserOpportunity={viewModel.selectedUserOpportunity}
          />
          <div className={styles.opportunitySubSection}>
            <OpportunitySubList
              collapsed={viewModel.appliedUserOpportunitiesCollapsed}
              onChange={viewModel.onUserOpportunityChanged}
              onChecked={viewModel.onUserOpportunityChecked}
              onSelectUserOpportunity={viewModel.onSelectUserOpportunity}
              onUnchecked={viewModel.onUserOpportunityUnchecked}
              userOpportunities={viewModel.appliedUserOpportunities}
              selectedUserOpportunity={viewModel.selectedUserOpportunity}
              setCollapsed={viewModel.onSetAppliedUserOpportunitiesCollapsed}
              title={t(texts.appliedCard.applied, {
                numberOpportunities:
                  viewModel.appliedUserOpportunities.length.toString(),
              })}
              listAndItemColorClassName={styles.itemApplied}
            />
          </div>
          <div className={styles.opportunitySubSection}>
            <OpportunitySubList
              collapsed={viewModel.trashUserOpportunitiesCollapsed}
              onChange={viewModel.onUserOpportunityChanged}
              onChecked={viewModel.onUserOpportunityChecked}
              onSelectUserOpportunity={viewModel.onSelectUserOpportunity}
              onUnchecked={viewModel.onUserOpportunityUnchecked}
              userOpportunities={viewModel.trashUserOpportunities}
              selectedUserOpportunity={viewModel.selectedUserOpportunity}
              setCollapsed={viewModel.onSetTrashUserOpportunitiesCollapsed}
              title={t(texts.trashCard.trash, {
                numberOpportunities:
                  viewModel.trashUserOpportunities.length.toString(),
              })}
              listAndItemColorClassName={styles.itemTrash}
            />
          </div>
        </div>

        {viewModel.needsDisplaySelectedUserOpportunity &&
          viewModel.selectedUserOpportunity && (
            <Card className={styles.readingSection}>
              <OpportunityIFrame
                userOpportunity={viewModel.selectedUserOpportunity}
                height="100%"
                width="100%"
              />
            </Card>
          )}
      </div>
    </div>
  );
};
