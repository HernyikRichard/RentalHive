import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public sideBarOpen: boolean = true;
  public isNotFoundPage: boolean = false;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNotFoundPage = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === '**';
      }
    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  onRouteActivated(event: any) {
    this.isNotFoundPage = event instanceof NotFoundComponent;
  }
}