import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/services/log-in.service';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoading = false;
  userDetails!: User;
  error: string = '';

  loginForm: FormGroup = this.fb.group({
    lanId: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private loginService: LogInService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    const payload = {
      userId: this.loginForm.value.lanId,
      password: this.loginForm.value.password
      // password: CryptoJS.AES.encrypt(
      //   this.loginForm.value.password,
      //   '!chubbLms!'
      // ).toString(),
    };
    this.isLoading = true;
    if (this.loginForm.valid) {
      // this.loginService.userLogin(payload).subscribe(
      //   (data) => {
      //     this.userDetails = data as User;
      //     this.isLoading = false;
      //     window.localStorage.setItem('token', data.token);
      //     sessionStorage.setItem('lanId', data.lanId);
      //     sessionStorage.setItem('userName', data.fullName);
      //     this.router.navigate(['/home']);
      //   },
      //   (errorRes) => {
      //     switch (errorRes.error.message) {
      //       case 'Invalid Credentials':
      //         this.error = 'Invalid Credentials';
      //     }
      //     this.isLoading = false;
      //   }
      // );
      this.isLoading = false;
      window.localStorage.setItem('token', "12345");
      sessionStorage.setItem('lanId', "teja");
      sessionStorage.setItem('userName', "12345");
      this.router.navigate(['/home']);
    }
  }
}
