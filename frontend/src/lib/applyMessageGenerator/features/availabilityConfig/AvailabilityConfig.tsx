import { useEffect, useState } from "react";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import styles from "./AvailabilityConfig.module.scss";
import { IAvailabilityConfigProps } from "./IAvailabilityConfigProps";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { BooleanMultiSelectButtons } from "../../components/booleanMultiSelectButtons/BooleanMultiSelectButtons";
import { InputField } from "../../components/inputField/InputField";

export const AvailabilityConfig: React.FC<IAvailabilityConfigProps> = (
  props
) => {
  const { t } = useTranslation();

  const [available, setAvailable] = useState<boolean | undefined>(
    props.initialValue
  );
  const [availableFrom, setAvailableFrom] = useState<string>("");

  useEffect(() => {
    if (available) {
      props.onChange(availableFrom);
    } else {
      props.onChange(undefined);
    }
  }, [available, availableFrom]);

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.availabilityConfigTitle)}
    >
      <div className={styles.availabilityConfig}>
        <BooleanMultiSelectButtons
          initialValue={props.initialValue}
          onChange={setAvailable}
        />
        {available && <InputField onChange={setAvailableFrom} />}
      </div>
    </ConfigureComponent>
  );
};
