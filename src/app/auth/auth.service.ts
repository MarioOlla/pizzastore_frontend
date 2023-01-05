import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient, private router:Router) { }

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User |null>(null);

  executeLogin(loginForm:User):Observable<User>{
    return this.http.post<{'jwt-token':string, 'ruolo':string}>(this.apiServer+'/login', JSON.stringify(loginForm),this.httpOptions).pipe(switchMap(res => of({username:loginForm.username , token: res['jwt-token'] ,ruolo: res['ruolo']})))
  }

  setUserLogged(user:User | null){
    this.userLoggedSubject$.next(user);
  }

  getUserLogged():Observable<User | null>{
    return this.userLoggedSubject$.asObservable();
  }

  isAdmin():boolean{
   return this.userLoggedSubject$.value?.ruolo === "ROLE_ADMIN";
  }

  isLogged():boolean{
    return this.userLoggedSubject$.value? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken():string | null{
    return this.userLoggedSubject$.value? this.userLoggedSubject$.value.token!: null;
  }

  logout(){
    this.setUserLogged(null);
    this.router.navigateByUrl('login');
  }
}
