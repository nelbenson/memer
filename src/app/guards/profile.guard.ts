
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from '../modules/core/services';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const profileId = route.params['id'];

    return this.userService.user$.pipe(
      take(1),
      map(user => user && user.uid === profileId),
      tap(isCurrentUsersProfile => {
        if (!isCurrentUsersProfile) {
          this.router.navigate(['/404']);
          return false;
        }
        return true;
      })
    );
  }
}
