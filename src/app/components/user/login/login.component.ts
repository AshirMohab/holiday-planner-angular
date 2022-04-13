import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUserForm!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordsConfirmed: boolean = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginUserForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required, Validators.minLength(1)],
      ],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  submitLogin(): boolean {
    return this.loginUserForm.value.email && this.loginUserForm.value.password;
  }

  loginUser() {
    const email: string = this.loginUserForm.value.email;
    const password: string = this.loginUserForm.value.password;
    this.auth.loginUser(email, password);
  }
}
