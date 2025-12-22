import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {NavigationService} from "../../../services/navigation.service";
import {Store} from "@ngrx/store";
import {SetLanguageAction, SetSettingsAction} from "../../../stores/settings/settings.action";
import {SelectOption} from "../../../typings";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StartGameAction} from "../../../stores/pokemon/pokemon.action";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  availableLanguages: SelectOption[] = [];
  availableNumberOfRounds = [5, 10, 15, 20];

  form: FormGroup;

  constructor(private languageService: LanguageService,
              private formBuilder: FormBuilder,
              private store: Store,
              private navigationService: NavigationService,
              private translateService: TranslateService) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    this.updateAvailableLanguages(this.languageService.getAvailableLanguages());
  }

  selectLanguage() {
    this.store.dispatch(SetLanguageAction({language: this.selectedLanguage.value}));
    this.updateAvailableLanguages(this.availableLanguages.map(l => l.value));
  }

  launchGame() {
    this.store.dispatch(SetSettingsAction({
      language: this.selectedLanguage.value,
      numberOfRounds: this.numberOfRounds.value,
      isShadowMode: this.isShadowMode.value
    }));
    this.store.dispatch(StartGameAction());
    this.navigationService.toGame();
  }

  private updateAvailableLanguages(languages: string[]) {
    this.translateService.get(
      languages.map(lang => 'LANGUAGES.' + lang.toUpperCase())
    ).subscribe(translations => {
      this.availableLanguages = languages
        .map(lang => ({
          value: lang,
          label: translations['LANGUAGES.' + lang.toUpperCase()],
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    });
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      language: ['fr', Validators.required],
      numberOfRounds: [10, Validators.required],
      isShadowMode: [false, Validators.required],
    });
  }

  get selectedLanguage() {
    return this.form.get('language') as FormControl;
  }

  get numberOfRounds() {
    return this.form.get('numberOfRounds') as FormControl;
  }

  get isShadowMode() {
    return this.form.get('isShadowMode') as FormControl;
  }
}
