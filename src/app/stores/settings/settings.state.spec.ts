import { AppState } from "../../app.ngrx";
import { selectLanguage, SettingsState } from "./settings.state";

describe('SettingsState', () => {
  let appState: AppState;
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = {
      language: 'fr',
      numberOfRounds: 0
    };

    appState = {
      settings: initialState
    };
  });

  it('should select language', () => {
    const language = selectLanguage(appState);

    expect(language).toEqual('fr');
  });
});
