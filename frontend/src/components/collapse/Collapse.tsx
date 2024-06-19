import { useState } from "react";
import { ReactComponent as CollapsedIcon } from "../../assets/collapsed.svg";
import { ReactComponent as ExpandedIcon } from "../../assets/expanded.svg";
import styles from "./Collapse.module.scss";
import { ICollapseProps } from "./ICollapseProps";

export const Collapse: React.FC<ICollapseProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed ?? true);

  const onToggleCollapsed = () =>
    setCollapsed((previous) => {
      previous = !previous;
      props.onToggle?.(previous);
      return previous;
    });

  return (
    <>
      {collapsed ? (
        <ExpandedIcon className={styles.icon} onClick={onToggleCollapsed} />
      ) : (
        <CollapsedIcon className={styles.icon} onClick={onToggleCollapsed} />
      )}
    </>
  );
};
