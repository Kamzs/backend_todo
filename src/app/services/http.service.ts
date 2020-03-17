import { Injectable } from '@angular/core';
import {Task} from '../jso/task';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogicService} from './logic.service';
import {AuthService} from "../auth/auth.service";
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:8081/api/v1/mongo';

  user: User;

  constructor(private httpClient: HttpClient, private logicService: LogicService) {
  }

  // mozna rowniez nie przyjmowac samego body w postaci json - ponizej zmiana konifguracji odbieranego response
  //  getTaskFromStorageFull(): Observable<HttpResponse<Response>>{
  //    return this.httpClient.get<Response>('http://localhost:8081/mongo/findAll', {observe: 'response'});
  //  }

  setUser(user: User){
    this.user = user;
    this.updateContent();
  }

  getTaskFromStorage(): Observable<Array<Task>> {
    let param;
    if(this.user){
      param = new HttpParams().set('fire', this.user.uid);
    }
    else{
      param = new HttpParams().set('fire', '');
    }
    return this.httpClient.get<Array<Task>>(this.url + '/findAll', {params: param});
  }

  addToDo(tasks: Array<Task>) {
    this.httpClient.post(this.url + '/add', tasks).subscribe(
      (x) => {

        this.updateContent();
        },
      error => console.log(error)
    );
  }

  updateContent() {
    this.getTaskFromStorage().subscribe((answer: Array<Task>) => {

      this.logicService.tasksToDO = answer.filter((value: Task) => value.done === null);
      this.logicService.subjectTasksToDo.next(this.logicService.tasksToDO);

      this.logicService.tasksDone = answer.filter((value: Task) => value.done !== null);
      this.logicService.subjectTasksDone.next(this.logicService.tasksDone);
    },
      error => console.log(error)
    );
  }

  updateOne(task: Task) {
    this.httpClient.put(this.url + '/update', task).subscribe(
      (answer) => {
        this.updateContent(); }
      ,
      error => console.log(error)
    );
  }

  removeToDo(task: Task) {
    const param = new HttpParams().set('id', task.id);
    this.httpClient.delete(this.url + '/delete', {params: param}).subscribe(
      (answer) => {
        console.log(answer);
        this.updateContent(); },
      error => console.log(error)
    );
  }

}
