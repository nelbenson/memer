import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from '../../guards';
import { ProfileComponent } from './components';

const routes: Routes = [
  { path: ':id', component: ProfileComponent, canActivate: [ProfileGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard]
})
export class ProfileRoutingModule { }
