import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  tasksToDO: Array<string> = ['task1', 'task2', 'task3'];
  tasksDone: Array<string> = [];

  subjectTasksToDo: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(this.tasksToDO);
  subjectTasksDone: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(this.tasksDone);

  constructor() { }

  getObservableTasksToDo() : Observable<Array<string>> {
    return this.subjectTasksToDo.asObservable();
  }
  getObservableTasksDone() : Observable<Array<string>> {
    return this.subjectTasksDone.asObservable();
  }

  addToDo(task: string) {
    this.tasksToDO.push(task);
    this.subjectTasksToDo.next(this.tasksToDO);
  };

  removeToDo(task: string){
    this.tasksToDO = this.tasksToDO.filter( x => x !== task);
    this.subjectTasksToDo.next(this.tasksToDO);

  }

  addDone(task: string){
    this.tasksToDO = this.tasksToDO.filter( x => x !== task);
    this.subjectTasksToDo.next(this.tasksToDO);
    this.tasksDone.push(task);
    this.subjectTasksDone.next(this.tasksDone);

  }

}
