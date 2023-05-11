import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sublet } from 'src/app/shared/interfaces/Sublet';
import { User } from 'src/app/shared/interfaces/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubletService } from 'src/app/shared/services/sublet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sublets$!: Observable<Sublet[]>;
  user!: User;
  filteredSublets$!: Observable<Sublet[]>;
  searchQuery: string = '';
  
  constructor(
    public authService: AuthService,
    private subletService: SubletService
  ){}

  ngOnInit() {
    this.sublets$ = this.subletService.getSublets();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.filterSublets();
  }

  filterSublets() {
    if (this.searchQuery === '') {
      this.filteredSublets$ = this.sublets$;
    } else {
      this.filteredSublets$ = this.sublets$.pipe(
        map(sublets => sublets.filter(sublet =>
          sublet.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          sublet.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          sublet.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        ))
      );
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterSublets();
  }

}
