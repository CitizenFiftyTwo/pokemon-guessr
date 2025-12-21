import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../../services/language.service";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { FormsModule } from "@angular/forms";
import { NavigationService } from "../../../services/navigation.service";
import { SetSettingsAction } from "../../../stores/settings/settings.action";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let mockStore: MockStore;

  beforeEach(async () => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', ['getAvailableLanguages', 'getLanguage']);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['toGame']);
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        FormsModule
      ],
      declarations: [SettingsComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: languageServiceSpy
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy
        },
        provideMockStore({
          selectors: []
        })
      ]
    })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore?.resetSelectors();
  });

  describe('On Init', () => {
    it('should get available languages', () => {
      languageServiceSpy.getAvailableLanguages.and.returnValue(['fr', 'en']);

      component.ngOnInit();

      expect(component.availableLanguages).toEqual(['fr', 'en']);
    });

    it('should select language', () => {
      languageServiceSpy.getLanguage.and.returnValue('fr');

      component.ngOnInit();

      expect(component.selectedLanguage).toEqual('fr');
    });
  });

  describe('Launch game', () => {
    it('should dispatch settings', () => {
      const dispatchSpyOn = spyOn(mockStore, 'dispatch');
      component.selectedLanguage = 'fr';

      component.launchGame();

      expect(dispatchSpyOn).toHaveBeenCalledWith(SetSettingsAction({language: 'fr'}));
    });

    it('should go to game', () => {
      component.launchGame();

      expect(navigationServiceSpy.toGame).toHaveBeenCalled();
    });
  });

});
