import { createAction, props } from "@ngrx/store";

const SettingsActionTypes = {
  SET_SETTINGS: '[Settings] Set settings'
};

export const SetSettingsAction = createAction(SettingsActionTypes.SET_SETTINGS,
  props<{ language: string, numberOfRounds: number }>());
