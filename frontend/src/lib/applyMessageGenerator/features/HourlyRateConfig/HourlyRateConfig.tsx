import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { IHourlyRateConfigProps } from "./IHourlyRateConfigProps";
import styles from "./HourlyRateConfig.module.scss";
import { useEffect, useState } from "react";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { BooleanMultiSelectButtons } from "../../components/booleanMultiSelectButtons/BooleanMultiSelectButtons";
import { InputField } from "../../components/inputField/InputField";

export const HourlyRateConfig: React.FC<IHourlyRateConfigProps> = (props) => {
  const { t } = useTranslation();

  const [hourlyRateActive, setHourlyRateActive] = useState<boolean | undefined>(
    props.initialValue
  );
  const [hourlyRate, setHourlyRate] = useState<string>("");

  useEffect(() => {
    if (hourlyRateActive) {
      props.onChange(hourlyRate);
    } else {
      props.onChange(undefined);
    }
  }, [hourlyRateActive, hourlyRate]);

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.hourlyRateConfigTitle)}
    >
      <div className={styles.hourlyRateConfig}>
        <BooleanMultiSelectButtons
          initialValue={props.initialValue}
          onChange={setHourlyRateActive}
        />
        {hourlyRateActive && (
          <InputField onChange={setHourlyRate} suffixLabel="€" />
        )}
      </div>
    </ConfigureComponent>
  );
};
