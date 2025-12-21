import { AppState } from "../../app.ngrx";
import { createSelector } from "@ngrx/store";

export interface SettingsState {
  language: string;
  numberOfRounds: number;
}

const LANGUAGE_FR = 'fr';
export const SettingsInitialState: SettingsState = {
  language: LANGUAGE_FR,
  numberOfRounds: 10
};

const settingsState = (state: AppState): SettingsState => state.settings as SettingsState;

export const selectLanguage = createSelector(settingsState, (state: SettingsState) =>
  state.language);

export const selectNumberOfRounds = createSelector(settingsState, (state: SettingsState) =>
  state.numberOfRounds);

