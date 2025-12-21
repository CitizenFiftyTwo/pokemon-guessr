import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { NavigationService } from "../../../services/navigation.service";
import { TranslateModule } from "@ngx-translate/core";

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['toSettings']);
    await TestBed.configureTestingModule({
      imports: [ResultComponent, TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: NavigationService,
          useValue: navigationServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
