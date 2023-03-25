import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { LoadNumberOfPokemonsAction } from "./stores/pokemon/pokemon.action";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        TranslateModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        provideMockStore({}),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('OnInit should dispatch load number of pokemons ', () => {
    let dispatchSpyOn = spyOn(mockStore, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpyOn).toHaveBeenCalledWith(LoadNumberOfPokemonsAction());
  });
});
