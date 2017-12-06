import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  passwordForm: FormGroup;
  loginCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  registrationFailed: boolean;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  static validYear(control: FormControl) {
    const birthYear = control.value;
    return birthYear > 1900 && birthYear < new Date().getFullYear() + 1
      ? null
      : { invalidYear: true };
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    this.birthYearCtrl = this.fb.control('', [Validators.required, RegisterComponent.validYear]);

    this.passwordForm = this.fb.group(
      {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      },
      { validator: RegisterComponent.passwordMatch }
    );

    this.userForm = this.fb.group({
      login: this.loginCtrl,
      birthYear: this.birthYearCtrl,
      passwordForm: this.passwordForm,
    });
  }

  register() {
    this.userService
      .register(
        this.userForm.value.login,
        this.passwordForm.value.password,
        this.userForm.value.birthYear
      )
      .subscribe(() => this.router.navigate(['/']), error => (this.registrationFailed = true));
  }
}
