import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const am = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: [CommonModule, ... am],
  exports: [... am]
})
export class AngularMaterialModule { }
