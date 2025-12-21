import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: []
})
export class CommonComponentsModule {
}
