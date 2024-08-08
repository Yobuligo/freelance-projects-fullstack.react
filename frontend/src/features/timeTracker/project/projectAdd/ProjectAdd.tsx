import { useState } from "react";
import { Button } from "../../../../components/button/Button";
import { LabeledInput } from "../../../../components/labeledInput/LabeledInput";
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
        <Button disabled={title.length === 0} onClick={onAdd}>
          {t(texts.projectAdd.addProject)}
        </Button>
      </div>
    </div>
  );
};
