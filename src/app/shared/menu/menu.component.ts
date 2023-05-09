import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user?: User;
  
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  this.authService.user$.subscribe((user) => {
    if (user) {
      this.user = user;
    }
  });
  }
  
}

