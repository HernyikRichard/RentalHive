import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SubletService } from '../services/sublet.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class SubletGuard implements CanActivate {
  user$! : User
  constructor(
    private authService: AuthService,
    private subletService: SubletService,
    private router: Router
  ) { 

    this.authService.user$.subscribe(user => {
      if (user) {
        this.user$ = user
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const subletId = route.paramMap.get('id')!;

    return this.subletService.getSublet(subletId).pipe(
      map(sublet => {
        if (this.user$.uid === sublet.userId || this.user$.role == 'admin') {
          return true;
        } else {
          this.router.navigate(['/home']); 
          return false;
        }
      })
    );
  }
  
}
