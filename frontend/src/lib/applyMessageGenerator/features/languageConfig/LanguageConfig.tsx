import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { EnumMultiSelectButtons } from "../../components/buttons/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { ILanguageConfigProps } from "./ILanguageConfigProps";
import { Language } from "./types/Language";

export const LanguageConfig: React.FC<ILanguageConfigProps> = (props) => {
  const { t } = useTranslation();
  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.languageConfigTitle)}
    >
      <EnumMultiSelectButtons
        enumType={Language}
        onChange={props.onChange}
        initialValue={props.initialValue}
      />
    </ConfigureComponent>
  );
};
