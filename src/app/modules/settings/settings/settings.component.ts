import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { selectLanguage } from "../../../stores/settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  availableLanguages: string[] = [];
  selectedLanguage$ = of('');

  constructor(private languageService: LanguageService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.selectedLanguage$ = this.store.select(selectLanguage);
  }
}
