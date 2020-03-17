import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {User} from "firebase";
import {HttpService} from "../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  user: User;

  constructor(private angularFireAuth : AngularFireAuth, private router: Router, private httpService: HttpService) {
    this.angularFireAuth.user.subscribe((user: User) => {
      this.user = user;
      this.httpService.setUser(user);
      this.httpService.updateContent();
    });
  }


  login(email: string, password: string){
    this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then(
        () => {
          this.router.navigate(['/add']);
          })
      .catch(er => {
        console.log(er);
      })
  }

  register(email: string, password: string){
    this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then(
        ()=> {
          this.router.navigate(['/add']);
        })
      .catch(er => {
        console.log(er);
      })
  }
  logout(){
    this.angularFireAuth.signOut();
  }


}

//todo - nie uruchamia sie udpate po zalogowaniu
