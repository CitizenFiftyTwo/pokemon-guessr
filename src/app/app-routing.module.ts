import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from "./modules/settings/settings/settings.component";
import { GuessrWrapperComponent } from "./modules/guessr/guessr-wrapper/guessr-wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },
  {
    path: 'game',
    component: GuessrWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
