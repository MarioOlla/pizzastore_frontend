import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

export interface UserForm extends FormGroup <{
  username: FormControl<string>;
  password: FormControl<string>;
}>{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  user: User = {};

  userReactive: UserForm = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){}

  login(){
    this.auth.executeLogin(this.userReactive.getRawValue()).subscribe({next:res => {
      this.auth.setUserLogged(res);
    }})
  }
}
