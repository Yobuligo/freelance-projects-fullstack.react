import { useState } from "react";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
import { SpinnerButton } from "../../../../components/spinnerButton/SpinnerButton";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IProjectAddProps } from "./IProjectAddProps";
import styles from "./ProjectAdd.module.scss";

export const ProjectAdd: React.FC<IProjectAddProps> = (props) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");

  const onAdd = () => {
    if (title.length > 0) {
      props.onAdd?.(title);
      setTitle("");
    }
  };

  const onChange = (newValue: string): void => setTitle(newValue);

  return (
    <div className={styles.projectAdd}>
      <LabeledInput
        label={t(texts.general.title)}
        onChange={onChange}
        onEnter={onAdd}
        value={title}
      />

      <div>
        <SpinnerButton
          disabled={title.length === 0}
          displaySpinner={props.isAdding}
          onClick={onAdd}
        >
          {t(texts.projectAdd.addProject)}
        </SpinnerButton>
      </div>
    </div>
  );
};
