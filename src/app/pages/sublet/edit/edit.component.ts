import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private subletService: SubletService
  ) { }


  ngOnInit(): void {
    this.subletId = this.route.snapshot.paramMap.get('id')!;
    this.sublet$ = this.subletService.getSublet(this.subletId);

    this.subletForm = this.formBuilder.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      parameters: this.formBuilder.group({
        type: ['', Validators.required],
        size: [null, Validators.required],
        heatingType: ['', Validators.required]
      }),
      images: [[]]
    });

    this.sublet$.subscribe((sublet: Sublet) => {
      this.subletForm.patchValue({
        title: sublet.title,
        address: sublet.address,
        description: sublet.description,
        parameters: {
          type: sublet.parameters.type,
          size: sublet.parameters.size,
          heatingType: sublet.parameters.heatingType
        },
        images: sublet.images || []
      });
    });

  }


  save() {
    if (this.subletForm.valid) {
      const formValue = this.subletForm.value;
      const updatedSublet: Sublet = {
        ...formValue,
        id: this.subletId
      };

      this.subletService.updateSublet(this.subletId, updatedSublet).then(() => {
        this.router.navigate(['/sublet/view/', this.subletId]);
      });
    }
  }

}
