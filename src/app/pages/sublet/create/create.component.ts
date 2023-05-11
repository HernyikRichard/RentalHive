import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl  } from '@angular/forms';
import { NewSublet } from 'src/app/shared/interfaces/Sublet';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'src/app/shared/interfaces/User';
import { SubletService } from 'src/app/shared/services/sublet.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-create-sublet',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  subletForm = this.fb.group({
    title: ['', Validators.required],
    address: ['', Validators.required],
    description: ['', Validators.required],
    parameters: this.fb.group({
      type: ['', Validators.required],
      size: [0, Validators.required],
      heatingType: ['', Validators.required],
    }),
    images: this.fb.array([])
  });

  isLoading = false;
  user?: User;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private subletService: SubletService,
    private storage: AngularFireStorage
    ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  onSubmit() {
    if (this.subletForm.valid) {
      const formValue = this.subletForm.getRawValue();
      const newSublet: NewSublet = {
        title: formValue.title || '',
        address: formValue.address || '',
        description: formValue.description || '',
        parameters: {
          type: formValue.parameters.type || '',
          size: formValue.parameters.size || 0,
          heatingType: formValue.parameters.heatingType || '',
        },
        images: formValue.images as string[] || [],
      };
      this.subletService.addSubletWithUserId(newSublet)
        .then(() => {
          console.log('Sublet added successfully');
          this.subletForm.reset();
        })
        .catch((error) => {
          console.error('Error adding sublet: ', error);
        });
    } else {
      console.log('Form is not valid');
    }
  }

  async uploadImage(event: any): Promise<void> {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file) {
        this.isLoading = true;
        const filePath = `sublet-pictures/${this.user!.uid}/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        try {
          await task;
          const url = await fileRef.getDownloadURL().toPromise();
          const images = this.subletForm.get('images') as FormArray;
          images.push(this.fb.control(url)); 
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}