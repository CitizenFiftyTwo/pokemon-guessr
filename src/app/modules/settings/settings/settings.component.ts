import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { NavigationService } from "../../../services/navigation.service";
import { Store } from "@ngrx/store";
import { SetLanguageAction } from "../../../stores/settings/settings.action";
import { SelectOption } from "../../../typings";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
    const languages = this.languageService.getAvailableLanguages();

    this.translateService.get(
      languages.map(lang => 'LANGUAGES.' + lang.toUpperCase())
    ).subscribe(translations => {

      this.availableLanguages = languages.map(lang => ({
        value: lang.toUpperCase(),
        label: translations['LANGUAGES.' + lang.toUpperCase()],
      })).sort((a, b) => a.label.localeCompare(b.label));
    });
  }

  launchGame() {
    this.store.dispatch(SetLanguageAction({language: this.selectedLanguage.value}));
    this.navigationService.toGame();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      language: ['FR', Validators.required],
      numberOfRounds: [10, Validators.required],
    });
  }

  get selectedLanguage() {
    return this.form.get('language')?.value as FormControl;
  }
}
