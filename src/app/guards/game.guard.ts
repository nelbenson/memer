
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { GameService } from '../modules/core/services';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(private router: Router, private gameService: GameService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const gameId = route.params['id'];

    return this.gameService.getGameById(gameId).pipe(
      take(1),
      map(game => {
        return game.payload.exists;
      }),
      tap(gameExists => {
        if (!gameExists) {
          this.router.navigate(['/404']);
          return false;
        }
        return true;
      }));
  }
}
