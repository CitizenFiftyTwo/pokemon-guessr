import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { LanguageService } from "../../services/language.service";
import { SetSettingsAction } from "../settings/settings.action";

@Injectable()
export class GlobalEffects {

  constructor(
    private languageService: LanguageService,
    private actions$: Actions
  ) {
  }

  initLanguage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => SetSettingsAction({
        language: this.languageService.getLanguage(), numberOfRounds: 10
      })
    )
  ));
}
