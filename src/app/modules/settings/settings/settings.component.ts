import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { NavigationService } from "../../../services/navigation.service";
import { Store } from "@ngrx/store";
import { SetLanguageAction } from "../../../stores/settings/settings.action";
import { SelectOption } from "../../../typings";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  availableLanguages: SelectOption[] = [];
  selectedLanguage = '';

  constructor(private languageService: LanguageService,
              private store: Store,
              private navigationService: NavigationService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const languages = this.languageService.getAvailableLanguages();

    this.translateService.get(
      languages.map(lang => 'LANGUAGES.' + lang.toUpperCase())
    ).subscribe(translations => {

      this.availableLanguages = languages.map(lang => ({
        value: lang,
        label: translations['LANGUAGES.' + lang.toUpperCase()],
      })).sort((a, b) => a.label.localeCompare(b.label));

      this.selectedLanguage = this.languageService.getLanguage();
    });
  }

  launchGame() {
    this.store.dispatch(SetLanguageAction({language: this.selectedLanguage}));
    this.navigationService.toGame();
  }
}
