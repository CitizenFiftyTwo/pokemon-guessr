import { createAction, props } from "@ngrx/store";

const SettingsActionTypes = {
  SET_LANGUAGE: '[Settings] Set language'
};

export const SetLanguageAction = createAction(SettingsActionTypes.SET_LANGUAGE,
  props<{ language: string }>());
