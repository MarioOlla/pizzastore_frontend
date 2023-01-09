import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  userLogged:User = {};

  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe({next:user => {
      if(user==null)
        this.router.navigateByUrl('login');
      else
        this.userLogged = user;
    }});
  }

  navigate(path:string){
    this.router.navigate([path]);
  }
}
