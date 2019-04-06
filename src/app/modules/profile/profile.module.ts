import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { COMPONENTS } from './components';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class ProfileModule { }
