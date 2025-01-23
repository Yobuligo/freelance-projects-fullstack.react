import { useCallback, useState } from "react";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { ApplicationTextEntry } from "./applicationTextEntry/ApplicationTextEntry";
import { IApplicationTextConfigProps } from "./IApplicationTextConfigProps";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { texts } from "../../../../hooks/useTranslation/texts";

export const ApplicationTextConfig: React.FC<IApplicationTextConfigProps> = (
  props
) => {
  const { t } = useTranslation();
  const [_, setSelectedApplicationTextsIndices] = useState<number[]>([]);

  const triggerOnChange = useCallback(
    (indexList: number[]) => {
      const stringValues = indexList.map(
        (index) => props.applicationTexts[index].text
      );
      props.onChange(stringValues);
    },
    [props]
  );

  const onSelect = useCallback(
    (selected: boolean, index: number) => {
      setSelectedApplicationTextsIndices((previous) => {
        let newValues: number[];
        if (selected) {
          newValues = [...previous];
          newValues.push(index);
        } else {
          newValues = [...previous].filter((value) => value !== index);
        }
        newValues = newValues.sort((a, b) => a - b);
        triggerOnChange(newValues);
        return newValues;
      });
    },
    [triggerOnChange]
  );

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.applicationText.title)}
    >
      {props.applicationTexts.map((applicationText, index) => (
        <ApplicationTextEntry
          key={`${applicationText.type}_${index}`}
          text={applicationText.text}
          title={applicationText.type}
          onSelect={(selected) => {
            onSelect(selected, index);
          }}
        />
      ))}
    </ConfigureComponent>
  );
};
