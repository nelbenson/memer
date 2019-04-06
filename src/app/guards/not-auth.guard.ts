import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from '../modules/core/services';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!!authenticated) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
