import { useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { ProviderType } from "../../../shared/types/ProviderType";

export const useProviderRequestInputViewModel = () => {
  const [providerType, setProviderType] = useState(ProviderType.Freelance);
  const [providerUrl, setProviderUrl] = useState("");

  const selectOptions: ISelectOption[] = useMemo(() => {
    const selectOptions: ISelectOption[] = [];
    for (const propName in ProviderType) {
      const propValue: string = (ProviderType as any)[propName];
      selectOptions.push({ key: propValue, text: propValue });
    }
    return selectOptions;
  }, []);

  const isInputValid = () => {
    return providerType.length > 0 && providerUrl.length > 0 ? true : false;
  };

  const onChangeForm = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onChangeProviderType = (selectOption: ISelectOption) => {
    setProviderType(selectOption.key as ProviderType);
  };

  const onChangeProviderUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProviderUrl(event.target.value);
  };

  const selectedProviderType = {
    key: providerType,
    text: (ProviderType as any)[providerType],
  };

  return {
    isInputValid,
    onChangeForm,
    onChangeProviderType,
    onChangeProviderUrl,
    selectedProviderType,
    selectOptions,
    providerUrl,
  };
};
