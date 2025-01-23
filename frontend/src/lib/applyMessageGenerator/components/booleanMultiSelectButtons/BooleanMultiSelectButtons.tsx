import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { MultiSelectButtons } from "../buttons/multiSelectButtons/MultiSelectButtons";
import { IBooleanMultiSelectButtonsProps } from "./IBooleanMultiSelectButtonsProps";

export const BooleanMultiSelectButtons: React.FC<
  IBooleanMultiSelectButtonsProps
> = (props) => {
  const { t } = useTranslation();
  let initialIndices = [];
  if (props.initialValue !== undefined) {
    props.initialValue ? initialIndices.push(0) : initialIndices.push(1);
  }
  return (
    <MultiSelectButtons
      preselectedIndices={initialIndices}
      isSingleSelect
      buttonLabels={[t(texts.general.yes), t(texts.general.no)]}
      onClick={(index) => {
        index === 0 ? props.onChange(true) : props.onChange(false);
      }}
    />
  );
};
