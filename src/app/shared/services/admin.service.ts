import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges({ idField: 'id' });
  }
}