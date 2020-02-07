import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/services/user";

@Component({
  selector: 'app-home',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  user: User;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.user = userData;
    console.log(this.user);
  }
}
