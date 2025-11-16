import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { CommonComponentsModule } from "../../common/common-components.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { NavigationService } from "../../services/navigation.service";
import { MultiSelectModule } from "primeng/multiselect";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CommonComponentsModule,
    FormsModule,
    MultiSelectModule
  ],
  providers: [
    NavigationService
  ]
})
export class SettingsModule {
}
