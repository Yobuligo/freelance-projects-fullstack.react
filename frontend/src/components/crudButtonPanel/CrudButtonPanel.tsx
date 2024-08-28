import { CheckIcon } from "../../icons/CheckIcon";
import { CloseIcon } from "../../icons/CloseIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import componentStyles from "../../styles/components.module.scss";
import { style } from "../../core/ui/style";
import styles from "./CrudButtonPanel.module.scss";
import { ICrudButtonPanelProps } from "./ICrudButtonPanelProps";

export const CrudButtonPanel: React.FC<ICrudButtonPanelProps> = (props) => {
  return (
    <div className={style(styles.crudButtonPanel, props.className)}>
      {props.displayMode ? (
        <>
          <button className={styles.button} onClick={props.onEditMode}>
            <EditIcon className={componentStyles.iconClickable} />
          </button>
          {props.onDelete && (
            <button className={styles.button} onClick={props.onDelete}>
              <DeleteIcon className={componentStyles.iconClickable} />
            </button>
          )}
        </>
      ) : (
        <>
          <button className={styles.button} onClick={props.onConfirm}>
            <CheckIcon className={componentStyles.iconClickable} />
          </button>
          <button className={styles.button} onClick={props.onCancel}>
            <CloseIcon className={componentStyles.iconClickable} />
          </button>
        </>
      )}
    </div>
  );
};
