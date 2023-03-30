import { AppState } from "../../app.ngrx";
import { createSelector } from "@ngrx/store";

export interface SettingsState {
  language: string;
}

const LANGUAGE_FR = 'fr';
export const SettingsInitialState: SettingsState = {
  language: LANGUAGE_FR
};

const settingsState = (state: AppState): SettingsState => state.settings as SettingsState;

export const selectLanguage = createSelector(settingsState, (state: SettingsState) =>
  state.language);

