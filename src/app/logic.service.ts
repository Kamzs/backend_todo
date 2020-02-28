import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  tasksToDO: Array<Task> = [];
  tasksDone: Array<Task> = [];

  subjectTasksToDo: BehaviorSubject<Array<Task>> = new BehaviorSubject<Array<Task>>(this.tasksToDO);
  subjectTasksDone: BehaviorSubject<Array<Task>> = new BehaviorSubject<Array<Task>>(this.tasksDone);

  constructor() {
  }

  getObservableTasksToDo() : Observable<Array<Task>> {
    return this.subjectTasksToDo.asObservable();
  }
  getObservableTasksDone() : Observable<Array<Task>> {
    return this.subjectTasksDone.asObservable();
  }

}
