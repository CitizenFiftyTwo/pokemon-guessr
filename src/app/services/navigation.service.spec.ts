import { NavigationService } from './navigation.service';
import { Router } from "@angular/router";

describe('NavigationService', () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    service = new NavigationService(routerSpy);
  });

  it('should navigate to login page', () => {
    service.toGame();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['game']);

  });
});
