import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.modle';
import {Router} from '@angular/router';

export interface AuthenticationData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthenticationSectionService {
  user = new BehaviorSubject<User>(null);
  private timeDuration: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthenticationData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1XFDBYFg1e9Q74GPqVi1yYQRskprIpQc', {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError), tap(resData => {
        this.authenticationHandler(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthenticationData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1XFDBYFg1e9Q74GPqVi1yYQRskprIpQc',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError), tap(resData => {
        this.authenticationHandler(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authenticationSection']);
    localStorage.removeItem('userKey');
    if (this.timeDuration) {
      clearTimeout(this.timeDuration);
    }
    this.timeDuration = null;
  }

  // Will store the user data within the running programme so when its refreshed, the data is saved
  automaticallyLogin() {
    const userKey: {email: string, id: string, _token: string, _tokenExperationDate: string} = JSON.parse(localStorage.getItem('userKey'));
    if (!userKey) {
      return;
    }

    const loadUserKey = new User(userKey.email, userKey.id, userKey._token, new Date(userKey._tokenExperationDate));

    if (loadUserKey.token) {
      this.user.next(loadUserKey);
      const time = new Date(userKey._tokenExperationDate).getTime() - new Date().getTime();
      this.automaticallyLogout(time);
    }
  }

  // Automatically clears and logs the user out, It will log the user out after 15 mins = 90000 miliseconds
  automaticallyLogout(duration: number) {
    this.timeDuration = setTimeout(() => {
      this.logout();
    }, 900000);
  }

  private authenticationHandler(email: string, localId: string, token: string, expiresIn: number) {
    const experation = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, token, experation);
    this.user.next(user);
    this.automaticallyLogout(expiresIn * 1000);
    // Stores user data in a key
    localStorage.setItem('userKey', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password doesnt match';
        break;
    }
    return throwError(errorMessage);
  }

}
