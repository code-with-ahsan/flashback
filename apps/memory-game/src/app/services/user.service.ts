import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';
import { User } from '@prisma/client';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  userSource = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null>;
  constructor(private http: HttpClient) {
    this.user$ = this.userSource.asObservable();
  }

  createUserIfNecessary(user: firebase.User) {
    const { displayName, email, photoURL, uid } = user;
    return this.http.post<User>(`${this.apiUrl}/users`, {
      displayName,
      email,
      photoURL,
      uid,
    });
  }

  setUser(user: User | null) {
    this.userSource.next(user);
  }

  logout() {
    this.setUser(null);
  }
}
