import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  processRunning = false;
  private formSubmitAttempt = false;

  private getFieldValue(name: string) {
    return this.form.get(name) == null ? '' : this.form.get(name)!.value;
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  isFieldInvalid(field: string) {
    const control = this.form.get(field);
    return control == null ? false : (!control.valid && control.touched) || (control.untouched && this.formSubmitAttempt);
  }

  onSubmit() {
    if (this.form.valid){
      this.processRunning = true;
      this.authenticationService.loginWithRole(
        this.getFieldValue('userName'),
        this.getFieldValue('password'),
        'ROLE_SUPER_ADMIN'
      ).subscribe(
        {
          next: (response) => {
            if (AuthenticationService.isLoggedIn()) {
              this.processRunning = false;
              this.router.navigate([this.authenticationService.redirectUrl])
                .then((e) => {
                  if (!e) {
                    console.error('Navigation has failed !');
                  }
              });
            } else {
              throw new Error();
            }
          },
          error: (e) => {
            this.processRunning = false;
            this.snackBar.open('Login ou mot de passe invalide.', 'X')
            console.error(e);
          },
          complete: () => console.info('complete')
        });
    }
    this.formSubmitAttempt = true;
  }
}
