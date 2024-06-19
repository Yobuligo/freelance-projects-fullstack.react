import { useState } from "react";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";

export const useProviderRequestItemViewModel = (
  props: IProviderRequestItemProps
) => {
  const [collapsed, setCollapsed] = useState(true);

  const onDelete = () => props.onDelete?.(props.providerRequest);

  const onSwitchChanged = (checked: boolean) => {
    props.providerRequest.enabled = checked;
    checked
      ? props.onEnable?.(props.providerRequest)
      : props.onDisable?.(props.providerRequest);
  };

  const providerDetails = useProviderDetails();

  const providerTitle = providerDetails.findByType(
    props.providerRequest.providerType
  );

  return {
    collapsed,
    onDelete,
    onSwitchChanged,
    providerTitle,
    setCollapsed,
  };
};
