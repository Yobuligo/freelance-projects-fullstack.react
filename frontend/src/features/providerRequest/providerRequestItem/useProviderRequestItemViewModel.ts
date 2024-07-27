import { useState } from "react";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { IProviderRequestItemProps } from "./IProviderRequestItemProps";

export const useProviderRequestItemViewModel = (
  props: IProviderRequestItemProps
) => {
  const [collapsed, setCollapsed] = useState(true);

  const onDelete = () => props.onDelete?.(props.userProviderRequest);

  const onSwitchChanged = (checked: boolean) => {
    props.userProviderRequest.enabled = checked;
    checked
      ? props.onEnable?.(props.userProviderRequest)
      : props.onDisable?.(props.userProviderRequest);
  };

  const providerDetails = useProviderDetails();

  const providerTitle = providerDetails.findByType(
    props.userProviderRequest.provider
  );

  return {
    collapsed,
    onDelete,
    onSwitchChanged,
    providerTitle,
    setCollapsed,
  };
};
