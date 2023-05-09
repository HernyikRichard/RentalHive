import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loadingScreen', [
      state('visible', style({ opacity: 1 })),
      state('invisible', style({ opacity: 0 })),
      transition('visible => hidden', animate('2s')),
    ]),
  ],
})

export class AppComponent{

  public sideBarOpen: boolean = false;
  public isNotFoundPage: boolean = false;
  public isLoading: boolean = false;
  public loadingState: string = 'invisible';

  constructor(public authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }
      if (event instanceof NavigationEnd) {
        this.isNotFoundPage = this.router.url.includes('not-found');
      }
    });
  }

  onRouteActivated(activatedComponent: any): void {
    this.loadingState = 'visible';
    setTimeout(() => {
      this.isLoading = false;
      this.loadingState = 'invisible';
      this.cd.detectChanges();
    }, 600);
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  loadingAnimationDone(event: AnimationEvent) {
    if (event.toState === 'invisible') {
      this.isLoading = false;
    }
  }


}