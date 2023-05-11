import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubletService } from 'src/app/shared/services/sublet.service';
import { Sublet } from 'src/app/shared/interfaces/Sublet';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-view-sublet',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  sublet$!: Observable<Sublet>;
  currentImageIndex = 0;
  subletImages!: string[];

  constructor(
    private route: ActivatedRoute,
    private subletService: SubletService
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
}