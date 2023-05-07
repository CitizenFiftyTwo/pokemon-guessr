import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../../services/language.service";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', ['getAvailableLanguages']);
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [SettingsComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On Init', () => {
    it('should get available languages', () => {
      languageServiceSpy.getAvailableLanguages.and.returnValue(['fr', 'en']);

      component.ngOnInit();

      expect(component.availableLanguages).toEqual(['fr', 'en']);
    });
  });
});
