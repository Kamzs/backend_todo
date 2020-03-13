import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) { }


  login(formularz: NgForm){
    this.authService.login(formularz.value.email,formularz.value.password);
  }
  register(formularz: NgForm){
    this.authService.register(formularz.value.email,formularz.value.password);
  }

}
