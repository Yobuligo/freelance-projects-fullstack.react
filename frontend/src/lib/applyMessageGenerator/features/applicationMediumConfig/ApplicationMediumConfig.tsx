import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { EnumMultiSelectButtons } from "../../components/buttons/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { IApplicationMediumConfigProps } from "./IApplicationMediumConfigProps";
import { ApplicationMedium } from "./types/ApplicationMedium";

export const ApplicationMediumConfig: React.FC<
  IApplicationMediumConfigProps
> = (props) => {
  const { t } = useTranslation();

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.applicationMediumConfigTitle)}
    >
      <EnumMultiSelectButtons
        enumType={ApplicationMedium}
        onChange={props.onChange}
        initialValue={props.initialValue}
      />
    </ConfigureComponent>
  );
};
