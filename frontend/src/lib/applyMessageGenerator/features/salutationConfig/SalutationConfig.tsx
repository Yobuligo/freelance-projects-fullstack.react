import { useCallback, useEffect, useState } from "react";
import { InputField } from "../../components/inputField/InputField";
import { EnumMultiSelectButtons } from "../../components/buttons/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { ISalutationConfigProps } from "./ISalutationConfigProps";
import styles from "./SalutationConfig.module.scss";
import { Gender } from "./types/Gender";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { texts } from "../../../../hooks/useTranslation/texts";

export const SalutationConfig: React.FC<ISalutationConfigProps> = (props) => {
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const { t } = useTranslation();

  const getText = useCallback((): string => {
    if (gender === undefined) return "";
    switch (gender) {
      case Gender.MR: {
        return t(texts.applyMessageGenerator.salutation.salutationMr, {
          lastName: lastName ?? "",
        });
      }
      case Gender.MS: {
        return t(texts.applyMessageGenerator.salutation.salutationMs, {
          lastName: lastName ?? "",
        });
      }
      case Gender.ANONYMOUS: {
        return t(texts.applyMessageGenerator.salutation.salutationAnonymous);
      }
    }
  }, [lastName, gender]);

  useEffect(() => {
    props.onChange(getText());
  }, [lastName, gender, getText]);

  return (
    <ConfigureComponent title={t(texts.applyMessageGenerator.salutation.title)}>
      <div className={styles.salutation}>
        <EnumMultiSelectButtons
          enumType={Gender}
          onChange={setGender}
          initialValue={props.initialValue}
        />
        {(gender === Gender.MR || gender === Gender.MS) && (
          <InputField
            label="Nachname"
            onChange={(lastName) => setLastName(lastName)}
          />
        )}
      </div>
    </ConfigureComponent>
  );
};
