import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubletService } from 'src/app/shared/services/sublet.service';
import { Sublet } from 'src/app/shared/interfaces/Sublet';
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subletId!: string;
  sublet$!: Observable<Sublet>;
  subletForm!: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subletService: SubletService
  ) { }


  ngOnInit(): void {

    this.subletId = this.route.snapshot.paramMap.get('id')!;
    this.sublet$ = this.subletService.getSublet(this.subletId);

    const formValue = this.subletForm.value;
    
    const updatedSublet: Sublet = {
      ...formValue,
      images: formValue.images || [],
    };

    this.subletService.updateSublet(this.subletId, updatedSublet).then(() => {
      this.router.navigate(['/sublet/view/', this.subletId]);
    });

  }


  onSubmit() {
    if (this.subletForm.valid) {
      const formValue = this.subletForm.value;
      const updatedSublet: Sublet = {
        ...formValue,
        id: this.subletId,
        images: formValue.images || [],
      };

      this.subletService.updateSublet(this.subletId,updatedSublet).then(() => {
        this.router.navigate(['/sublet', this.subletId]);
      });
    }
  }

}
