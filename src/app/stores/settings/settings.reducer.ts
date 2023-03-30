import { createReducer, on } from "@ngrx/store";
import { SettingsInitialState, SettingsState } from "./settings.state";
import { SetLanguageAction } from "./settings.action";

const setLanguage = (state: SettingsState, {language}: { language: string }) => ({
  ...state,
  language: language
});

export const settingsReducer = createReducer(
  SettingsInitialState,
  on(SetLanguageAction, setLanguage)
);
