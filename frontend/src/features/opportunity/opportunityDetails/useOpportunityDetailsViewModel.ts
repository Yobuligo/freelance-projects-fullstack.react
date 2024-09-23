import { useMemo, useState } from "react";
import { NoteApi } from "../../../api/NoteApi";
import { UserOpportunityApi } from "../../../api/UserOpportunityApi";
import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { uuid } from "../../../core/utils/uuid";
import { useRequest } from "../../../hooks/useRequest";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { INote } from "../../../shared/model/INote";
import { ApplicationType } from "../../../shared/types/ApplicationType";
import { IOpportunityDetailsProps } from "./IOpportunityDetailsProps";

export const useOpportunityDetailsViewModel = (
  props: IOpportunityDetailsProps
) => {
  const [triggerChangeDebounceTimeout, setTriggerChangeDebounceTimeout] =
    useState<NodeJS.Timeout | undefined>(undefined);
  const [changeNoteTimeout, setChangeNoteTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const { t } = useTranslation();
  const createNoteRequest = useRequest();
  const updateNoteRequest = useRequest();
  const [text, setText] = useState(props.userOpportunity.note?.text ?? "");

  const createNote = (text: string) => {
    const note: INote = {
      id: uuid(),
      text: text,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    props.userOpportunity.note = note;
    props.userOpportunity.noteId = note.id;
    createNoteRequest.send(async () => {
      await new UserOpportunityApi().addNote(props.userOpportunity, note);
    });
  };

  const debounceChange = () => {
    clearTimeout(triggerChangeDebounceTimeout);
    const timeoutId = setTimeout(() => {
      triggerChange();
    }, 500);
    setTriggerChangeDebounceTimeout(timeoutId);
  };

  const triggerChange = () => props.onChange?.(props.userOpportunity);

  const onApplyChanged = (checked: boolean) => {
    props.userOpportunity.applied = checked;
    if (checked === true) {
      props.userOpportunity.appliedAt =
        new Date().toISOString() as unknown as Date;
    } else {
      props.userOpportunity.appliedAt = undefined;
    }

    if (
      checked === true &&
      props.userOpportunity.applicationType === undefined
    ) {
      props.userOpportunity.applicationType = ApplicationType.Portal;
    }
    triggerChange();
  };

  /**
   * Switch to reject was changed
   */
  const onRejectChanged = (checked: boolean) => {
    props.userOpportunity.rejected = checked;
    if (checked === true) {
      props.userOpportunity.rejectedAt =
        new Date().toISOString() as unknown as Date;
    } else {
      props.userOpportunity.rejectedAt = undefined;
    }
    triggerChange();
  };

  const onSelectPortal = () => {
    props.userOpportunity.applicationType = ApplicationType.Portal;
    triggerChange();
  };

  const onSelectEmail = () => {
    props.userOpportunity.applicationType = ApplicationType.Email;
    triggerChange();
  };

  const onContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.userOpportunity.contact = event.target.value;
    debounceChange();
  };

  const onNoteTextChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);

    clearTimeout(changeNoteTimeout);
    const timeout = setTimeout(() => {
      const note = props.userOpportunity.note;
      if (note === undefined || note === null) {
        createNote(event.target.value);
      } else {
        note.text = event.target.value;
        updateNote(note);
      }
    }, 500);
    setChangeNoteTimeout(timeout);
  };

  const applicationTypeItems: IToggleButtonOption<ApplicationType>[] = useMemo(
    () => [
      {
        key: ApplicationType.Portal,
        text: t(texts.opportunityDetails.portal),
      },
      {
        key: ApplicationType.Email,
        text: t(texts.opportunityDetails.email),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onApplicationTypeSelected = (
    selected: IToggleButtonOption<ApplicationType>
  ): void => {
    if (selected.key === ApplicationType.Email) {
      onSelectEmail();
    } else {
      onSelectPortal();
    }
  };

  const findSelected = (): IToggleButtonOption<ApplicationType> | undefined => {
    return applicationTypeItems.find(
      (applicationTypeOption) =>
        applicationTypeOption.key === props.userOpportunity.applicationType
    );
  };

  const updateNote = async (note: INote) => {
    updateNoteRequest.send(async () => {
      await new NoteApi().update(note);
    });
  };

  return {
    applicationTypeItems,
    findSelected,
    onContactChange,
    onApplyChanged,
    onApplicationTypeSelected,
    onNoteTextChange,
    onRejectChanged,
    text,
  };
};
