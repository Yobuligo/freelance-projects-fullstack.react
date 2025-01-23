import { useState } from "react";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { Farewell } from "./Farewell";
import { IFarewellConfigProps } from "./IFarewellConfigProps";
import { IFarewell } from "./IFarewell";
import styles from "./FarewellConfig.module.scss";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { texts } from "../../../../hooks/useTranslation/texts";
import { EnumMultiSelectButtons } from "../../components/buttons/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { InputField } from "../../components/inputField/InputField";

export const FarewellConfig: React.FC<IFarewellConfigProps> = (props) => {
  const { t } = useTranslation();
  const [farewell, setFarewell] = useState<IFarewell>(
    props.initialFarewell ?? { farewell: Farewell.POLITE }
  );

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.farewellConfig.title)}
    >
      <div className={styles.farewellConfig}>
        <EnumMultiSelectButtons
          enumType={Farewell}
          initialValue={farewell.farewell}
          onChange={(farewell) => {
            setFarewell((previous) => {
              const newFarewell: IFarewell = {
                ...previous,
                farewell,
              };
              props.onChange(newFarewell);
              return newFarewell;
            });
          }}
        />
        <InputField
          label={t(texts.applyMessageGenerator.general.nameInputFieldLabel)}
          initialValue={props.initialFarewell?.name}
          onChange={(name) => {
            setFarewell((previous) => {
              const newFarewell: IFarewell = {
                ...previous,
                name,
              };
              props.onChange(newFarewell);
              return newFarewell;
            });
          }}
        />
      </div>
    </ConfigureComponent>
  );
};
