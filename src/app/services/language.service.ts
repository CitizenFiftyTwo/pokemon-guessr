import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly KNOWN_LANGUAGES = ['fr', 'en'];

  constructor(private translateService: TranslateService) {
  }

  getLanguage(): string {
    const browserLanguage = this.translateService.getBrowserLang();
    return this.KNOWN_LANGUAGES.includes(browserLanguage || '') ? browserLanguage!! : this.KNOWN_LANGUAGES[0];
  }

  getAvailableLanguages(): string[] {
    return this.KNOWN_LANGUAGES;
  }
}
