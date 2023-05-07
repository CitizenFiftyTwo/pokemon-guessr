import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { NavigationService } from "../../../services/navigation.service";
import { Store } from "@ngrx/store";
import { SetLanguageAction } from "../../../stores/settings/settings.action";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  availableLanguages: string[] = [];
  selectedLanguage = '';

  constructor(private languageService: LanguageService,
              private store: Store,
              private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.selectedLanguage = this.languageService.getLanguage();
  }

  launchGame() {
    this.store.dispatch(SetLanguageAction({language: this.selectedLanguage}));
    this.navigationService.toGame();
  }
}
