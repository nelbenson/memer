import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';
import { GameRoutingModule } from './game-routing.module';
import { PIPES } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class GameModule { }
