import { SettingsInitialState, SettingsState } from "./settings.state";
import { settingsReducer } from "./settings.reducer";
import { INIT } from "@ngrx/store";
import { SetSettingsAction } from "./settings.action";

describe('SettingsReducer', () => {
  let initialState: SettingsState;

  beforeEach(() => {
    initialState = SettingsInitialState;
  });

  it('should initialize the store', () => {
    const state = settingsReducer(undefined, {type: INIT});

    expect(state).toEqual(SettingsInitialState);
  });

  it('SetLanguageAction should update language', () => {
    const action = SetSettingsAction({language: 'fr'});

    const state = settingsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      language: 'fr'
    });
  });
});
