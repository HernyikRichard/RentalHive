import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/User';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  user?: User;
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      photoURL: [''],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)],
      role: ['tenant'],
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
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user'
        });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const updatedUser = await this.authService.getCurrentUser();

    if (updatedUser) {
  
      updatedUser.updateProfile({
        displayName: this.profileForm.get('displayName')?.value,
        photoURL: this.profileForm.get('photoURL')?.value,
      }).then(() => {
        const role = this.profileForm.get('role')?.value;
        this.authService.updateUserData(updatedUser, { role }).then(() => {
          this.router.navigate(['/profile']);
        });
      })
  
      const newPassword = this.profileForm.get('newPassword')?.value;
  
      if (newPassword) {
        try {
          await this.authService.changePassword(newPassword);
        } catch (error) {
          console.error(error);
        }
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
          this.profileForm.patchValue({ photoURL: url });
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}