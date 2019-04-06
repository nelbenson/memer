import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameGuard } from '../../guards';
import { GameroomComponent } from './components/gameroom';

const routes: Routes = [
  { path: ':id', component: GameroomComponent, canActivate: [GameGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [GameGuard],
  exports: [RouterModule]
})
export class GameRoutingModule { }
