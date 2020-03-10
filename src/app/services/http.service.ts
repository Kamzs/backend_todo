import { Injectable } from '@angular/core';
import {Task} from '../jso/task';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogicService} from './logic.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:8081/api/v1/mongo';

  constructor(private httpClient: HttpClient, private logicService: LogicService) {
    this.updateContent();
  }

  // mozna rowniez nie przyjmowac samego body w postaci json - ponizej zmiana konifguracji odbieranego response
  //  getTaskFromStorageFull(): Observable<HttpResponse<Response>>{
  //    return this.httpClient.get<Response>('http://localhost:8081/mongo/findAll', {observe: 'response'});
  //  }
  getTaskFromStorage(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(this.url + '/findAll');
  }

  //todo - dodac w backednzie enpoint przyjmujacy cala liste nowych taskow
  //todo - we frontendzie zmieniac logike zeby wysylala jeden POST z arrayem

  addToDo(task: Task[]) {
    this.httpClient.post(this.url + '/add', task).subscribe(
      () => { this.updateContent(); },
      error => console.log(error)
    );

  }

  updateContent() {
    this.getTaskFromStorage().subscribe((answer: Array<Task>) => {
      console.log(answer);
      this.logicService.tasksToDO = answer.filter((value: Task) => value.done === null);
      this.logicService.subjectTasksToDo.next(this.logicService.tasksToDO);

      this.logicService.tasksDone = answer.filter((value: Task) => value.done !== null);
      this.logicService.subjectTasksDone.next(this.logicService.tasksDone);
    },
      error => console.log(error)
    );
  }

  updateOne(task: Task) {
    console.log(task);
    this.httpClient.put(this.url + '/update', task).subscribe(
      (answer) => {
        console.log(answer);
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
        this.updateContent(); }
        ,
      error => console.log(error)
    );
  }

}
