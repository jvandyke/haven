import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../kanban/shared/kanban.model';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isLoggedIn: boolean;
  redirectUrl: string;
  loggedInUser: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (auth) => {
        if (auth === null) {
          console.log('Not Logged in.');
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        } else {
          console.log('Successfully Logged in.', auth);
          this.isLoggedIn = true;
          this.setUpLoggedInUser(auth);
          this.router.navigate(['']);
        }
      }
    );
  }
  setUpLoggedInUser(auth) {
    this.loggedInUser = {
      uid: auth.uid,
      displayName: auth.displayName,
      photoUrl: auth.photoUrl,
      email: auth.email
    }
  }
  login(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
