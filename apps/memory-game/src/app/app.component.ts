import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { UserService } from './services/user.service';
@Component({
  selector: 'mg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.auth.authState.subscribe((authUser) => {
      if (!authUser) {
        this.router.navigate(['/welcome']);
      } else {
        this.userService.createUserIfNecessary(authUser).subscribe((user) => {
          this.userService.setUser(user);
        });
      }
    });
  }
}
