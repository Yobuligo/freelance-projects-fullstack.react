import { useState } from "react";
import { Button } from "../../../components/button/Button";
import { ITabItem } from "../../../components/tabStrip/ITabItem";
import { TabStrip } from "../../../components/tabStrip/TabStrip";
import { TabStripContent } from "../../../components/tabStripContent/TabStripContent";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsIcon } from "../../../icons/SettingsIcon";
import { ProjectSection } from "../project/projectSection/ProjectSection";
import { ReportSection } from "../report/reportSection/ReportSection";
import styles from "./TimeTracker.module.scss";
import { useTimeTrackerViewModel } from "./useTimeTrackerViewModel";

export const TimeTracker: React.FC = () => {
  const viewModel = useTimeTrackerViewModel();
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  const tabItems: ITabItem[] = [
    {
      title: t(texts.timeTracker.projects),
      content: <ProjectSection displaySettings={viewModel.displaySettings} />,
    },
    {
      title: t(texts.timeTracker.reporting),
      content: <ReportSection displaySettings={viewModel.displaySettings} />,
    },
  ];

  const onSelectTabItem = (_: ITabItem, index: number) => setTabIndex(index);

  return (
    <div className={styles.timeTracker}>
      <div className={styles.toolbar}>
        <TabStrip
          tabItems={tabItems}
          onSelect={onSelectTabItem}
          selected={tabIndex}
        />
        <div className={styles.buttons}>
          <Button onClick={viewModel.onToggleDisplaySettings}>
            <SettingsIcon />
          </Button>
        </div>
      </div>
      <TabStripContent children={tabItems[tabIndex].content} />
    </div>
  );
};
