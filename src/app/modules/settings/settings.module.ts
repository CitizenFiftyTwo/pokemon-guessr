import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { CommonComponentsModule } from "../../common/common-components.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationService } from "../../services/navigation.service";
import { MultiSelectModule } from "primeng/multiselect";
import { FloatLabel } from "primeng/floatlabel";
import { Select } from "primeng/select";
import { Button } from "primeng/button";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CommonComponentsModule,
    FormsModule,
    MultiSelectModule,
    FloatLabel,
    Select,
    ReactiveFormsModule,
    Button
  ],
  providers: [
    NavigationService
  ]
})
export class SettingsModule {
}
