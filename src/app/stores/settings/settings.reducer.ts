import { createReducer, on } from "@ngrx/store";
import { SettingsInitialState, SettingsState } from "./settings.state";
import { SetSettingsAction } from "./settings.action";

const setSettings = (state: SettingsState, {language, numberOfRounds}: {
  language: string,
  numberOfRounds: number
}) => ({
  ...state,
  language,
  numberOfRounds
});

export const settingsReducer = createReducer(
  SettingsInitialState,
  on(SetSettingsAction, setSettings)
);
