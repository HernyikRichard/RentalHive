import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubletService } from 'src/app/shared/services/sublet.service';
import { Sublet } from 'src/app/shared/interfaces/Sublet';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-view-sublet',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  sublet$!: Observable<Sublet>;
  currentImageIndex = 0;
  subletImages!: string[];
  user?: User | null;

  constructor(
    private route: ActivatedRoute,
    private subletService: SubletService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sublet$ = this.subletService.getSublet(id);
      this.sublet$.subscribe(sublet => {
        if (sublet?.images) {
          this.subletImages = sublet.images;
        }
      });
    }
    this.initUser();
  }

  async initUser() {
    this.user = await this.authService.getUser();
  }

  nextImage() {
    if (this.currentImageIndex < this.subletImages.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.subletImages.length - 1;
    }
  }

  editSublet(id: string): void {
    this.router.navigate(['/sublet/edit', id]);
  }
}