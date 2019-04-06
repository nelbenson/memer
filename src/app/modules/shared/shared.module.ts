import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/social-shapes';
import { PIPES } from './pipes';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
