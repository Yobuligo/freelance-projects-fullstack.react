import { useMemo, useState } from "react";
import { ISelectOption } from "../../../components/select/ISelectOption";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { ProviderType } from "../../../shared/types/ProviderType";
import { IProviderRequestInputProps } from "./IProviderRequestInputProps";

export const useProviderRequestInputViewModel = (
  props: IProviderRequestInputProps
) => {
  const providerDetails = useProviderDetails();
  const [providerType, setProviderType] = useState(
    ProviderType.ComputerFutures
  );
  const [providerUrl, setProviderUrl] = useState("");
  const [requestTitle, setRequestTitle] = useState("");

  const selectOptions: ISelectOption<ProviderType>[] = useMemo(() => {
    const selectOptions: ISelectOption<ProviderType>[] = [];
    for (const propName in ProviderType) {
      const propValue = (ProviderType as any)[propName];
      const title = providerDetails.findByType(propValue as ProviderType);
      selectOptions.push({
        key: propValue,
        text: title,
      });
    }
    return selectOptions;
  }, [providerDetails]);

  const isInputValid = () => {
    return providerType.length > 0 &&
      providerUrl.length > 0 &&
      requestTitle.length > 0
      ? true
      : false;
  };

  const onAdd = () => {
    props.onAdd?.(providerType, providerUrl, requestTitle);
    setProviderUrl("");
    setRequestTitle("");
  };

  const onChangeForm = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onChangeProviderType = (selectOption: ISelectOption<ProviderType>) =>
    setProviderType(selectOption.key as ProviderType);

  const onChangeProviderUrl = (providerUrl: string) =>
    setProviderUrl(providerUrl);

  const onChangeRequestTitle = (title: string) => setRequestTitle(title);

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
    onChangeRequestTitle,
    selectedProviderType,
    selectOptions,
    providerUrl,
    requestTitle,
  };
};
