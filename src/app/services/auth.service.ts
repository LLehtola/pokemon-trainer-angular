import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.retrieveUserFromLocalStorage();
  }
  private _user = new BehaviorSubject<User>({
    name: '',
  });
  readonly user = this._user.asObservable();
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn = this._isLoggedIn.asObservable();

  retrieveUserFromLocalStorage(): void {
    const localStorageValue = localStorage.getItem('name');
    if (localStorageValue) {
      this._user.next({ name: localStorageValue });
      this._isLoggedIn.next(true);
    }
  }

  storeUserInLocalStorage(name: string): void {
    this._user.next({ name });
    this._isLoggedIn.next(true);
    localStorage.setItem('name', name);
  }

  isRegistered(): boolean {
    let isRegistered: boolean;
    this.user.subscribe((value) => (isRegistered = value.name.length > 0));
    return isRegistered;
  }
}
