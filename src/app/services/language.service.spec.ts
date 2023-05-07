import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { TranslateService } from "@ngx-translate/core";

describe('LanguageService', () => {
  let service: LanguageService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['getBrowserLang']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceSpy
        },
      ]
    });
    service = TestBed.inject(LanguageService);
  });


  describe('getDefaultLanguage', () => {
    it('should be browser language for en', () => {
      translateServiceSpy.getBrowserLang.and.returnValue('en');

      const browserLanguage = service.getLanguage();

      expect(browserLanguage).toEqual('en');
    });

    it('should be browser language for fr', () => {
      translateServiceSpy.getBrowserLang.and.returnValue('fr');

      const browserLanguage = service.getLanguage();

      expect(browserLanguage).toEqual('fr');
    });

    it('should be fr when browser language is not known', () => {
      translateServiceSpy.getBrowserLang.and.returnValue('de');

      const browserLanguage = service.getLanguage();

      expect(browserLanguage).toEqual('fr');
    });
  })

  describe('getAvailableLanguages', () => {
    it('should return available languages', () => {
      const availableLanguagues = service.getAvailableLanguages();

      expect(availableLanguagues).toEqual(['fr', 'en']);
    });
  });
});
