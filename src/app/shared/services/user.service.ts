import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/users';
  usersRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  getUsersList(): AngularFireList<any> {
    return this.usersRef;
  }

  addUser(user: any): any {
    return this.usersRef.push(user);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  deleteUser(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  deleteAllUsers(): Promise<void> {
    return this.usersRef.remove();
  }
  
}