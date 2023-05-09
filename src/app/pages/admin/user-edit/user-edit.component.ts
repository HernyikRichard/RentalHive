import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user?: User;
  userEditForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userEditForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)],
      photoURL: [''],
    }, {
      validator: this.checkPasswords
    });
  }

  checkPasswords(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { notSame: true };
    }
    return null;
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.authService.getUserById(userId).subscribe((user) => {
        if (user) {
          this.user = user;
          this.userEditForm.patchValue({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.userEditForm.valid) {
      try {
        await this.authService.updateUser(this.user!.uid!, this.userEditForm.value);
        this.router.navigate(['/admin']);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async uploadImage(event: any): Promise<void> {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file) {
        this.isLoading = true;
        const filePath = `profile-pictures/${this.user!.uid}/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        try {
          await task;
          const url = await fileRef.getDownloadURL().toPromise();
          this.userEditForm.patchValue({ photoURL: url });
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}