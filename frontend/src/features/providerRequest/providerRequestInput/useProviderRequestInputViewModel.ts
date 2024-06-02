import { useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { ProviderType } from "../../../shared/types/ProviderType";
import { IProviderRequestInputProps } from "./IProviderRequestInputProps";

export const useProviderRequestInputViewModel = (
  props: IProviderRequestInputProps
) => {
  const [providerDetails] = useProviderDetails();
  const [providerType, setProviderType] = useState(ProviderType.Freelance);
  const [providerUrl, setProviderUrl] = useState("");

  const selectOptions: ISelectOption[] = useMemo(() => {
    const selectOptions: ISelectOption[] = [];
    for (const propName in ProviderType) {
      const propValue: string = (ProviderType as any)[propName];
      const providerDetail = providerDetails.find(
        (item) => item.type === propValue
      );
      selectOptions.push({
        key: propValue,
        text: providerDetail?.title ?? propValue,
      });
    }
    return selectOptions;
  }, [providerDetails]);

  const isInputValid = () => {
    return providerType.length > 0 && providerUrl.length > 0 ? true : false;
  };

  const onAdd = () => {
    props.onAdd?.(providerType, providerUrl);
    setProviderUrl("");
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
    onAdd,
    onChangeForm,
    onChangeProviderType,
    onChangeProviderUrl,
    selectedProviderType,
    selectOptions,
    providerUrl,
  };
};
