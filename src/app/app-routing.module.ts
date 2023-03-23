import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessrWrapperComponent } from "./modules/guessr/guessr-wrapper/guessr-wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: GuessrWrapperComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
