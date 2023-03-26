import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessrWrapperComponent } from './guessr-wrapper.component';
import { TranslateModule } from "@ngx-translate/core";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectNumberOfPokemons } from "../../../stores/pokemon";
import { LoadPokemonNameAction } from "../../../stores/pokemon/pokemon.action";

describe('GuessrWrapperComponent', () => {
  let component: GuessrWrapperComponent;
  let fixture: ComponentFixture<GuessrWrapperComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessrWrapperComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectNumberOfPokemons,
              value: 151
            }
          ]
        }),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GuessrWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('OnInit', () => {
    it('should dispatch LoadPokemonNameAction', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadPokemonNameAction({pokemonIndex: 150}));
    });
  })
});
