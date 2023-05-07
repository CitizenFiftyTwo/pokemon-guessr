import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { CommonComponentsModule } from "../../common/common-components.module";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CommonComponentsModule
  ]
})
export class SettingsModule {
}
