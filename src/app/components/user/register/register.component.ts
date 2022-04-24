import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;
  registered: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordsConfirmed: boolean = false;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authorize: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      surname: [''],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  verifyEmail() {
    return this.registerUserForm.value.email;
  }

  verifyPassword() {
    return true;
  }

  submitRegistration() {
    return (this.registered =
      this.registerUserForm.get('email')?.enabled &&
      this.registerUserForm.get('confirmPassword')?.enabled &&
      this.registerUserForm.value.confirmPassword &&
      this.passwordsConfirmed);
  }

  registerNewUser() {
    const email = this.registerUserForm.value.email;
    const password = this.registerUserForm.value.password;
    const name = this.registerUserForm.value.name;

    this.authorize.registerUser(email, password, name);
  }
}
