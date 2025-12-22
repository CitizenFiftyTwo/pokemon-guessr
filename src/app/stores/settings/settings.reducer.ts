import {createReducer, on} from "@ngrx/store";
import {SettingsInitialState, SettingsState} from "./settings.state";
import {SetLanguageAction, SetSettingsAction} from "./settings.action";

const setSettings = (state: SettingsState, {language, numberOfRounds, isShadowMode}: {
  language: string,
  numberOfRounds: number,
  isShadowMode: boolean
}) => ({
  ...state,
  language,
  numberOfRounds,
  isShadowMode
});

const setLanguage = (state: SettingsState, {language}: {
  language: string
}) => ({
  ...state,
  language
});

export const settingsReducer = createReducer(
  SettingsInitialState,
  on(SetSettingsAction, setSettings),
  on(SetLanguageAction, setLanguage),
);
