import {createAction, props} from "@ngrx/store";

const SettingsActionTypes = {
  SET_SETTINGS: '[Settings] Set settings',
  SET_LANGUAGE: '[Settings] Set language'
};

export const SetSettingsAction = createAction(SettingsActionTypes.SET_SETTINGS,
  props<{ language: string, numberOfRounds: number, isShadowMode: boolean }>());


export const SetLanguageAction = createAction(SettingsActionTypes.SET_LANGUAGE,
  props<{ language: string }>());
