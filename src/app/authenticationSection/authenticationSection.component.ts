import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationData, AuthenticationSectionService} from './authenticationSection.service';


@Component({
  selector: 'app-authenticationSection',
  templateUrl: './authenticationSection.component.html'
})
export class AuthenticationSectionComponent {
  loginMode = true;
  loading = false;
  error: string = null;

  constructor(private authenticationSectionService: AuthenticationSectionService, private router: Router) {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authenticationObserver: Observable<AuthenticationData>;

    this.loading = true;
    if (this.loginMode) {
      authenticationObserver = this.authenticationSectionService.login(email, password);
    } else {
      authenticationObserver = this.authenticationSectionService.signup(email, password);
    }

    authenticationObserver.subscribe(resData => {
      console.log(resData);
      this.loading = false;
      this.router.navigate(['/products']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.loading = false;
    });
    form.reset();
  }

}
