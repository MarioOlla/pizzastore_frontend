import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Utente } from 'src/app/models/Utente';
import { AuthService } from '../auth.service';

export interface LoginForm extends FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  utente?: Utente;
  destroy$: Subject<boolean> = new Subject();
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  utenteReactive: LoginForm = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onClick(): void {
    this.authService.login(this.utenteReactive.getRawValue()).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.authService.setUserLogged(res);
    });
  }
}
