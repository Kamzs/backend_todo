import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {Task} from '../jso/task';
import {HttpService} from '../services/http.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  toShow: Observable<Array<Task>>;

  nameOfChangedTask: string = ''
  changedContent: string = '';
  changedTask: Array<Task> = [];
  changing: boolean = false;

  constructor(private logicService: LogicService, private httpService: HttpService) {
    this.toShow = this.logicService.getObservableTasksToDo();
  }

  markDone(task: Task) {
    task.done = new Date();
    this.httpService.updateOne(task);
  }
  remove(task: Task) {
    this.httpService.removeToDo(task);
  }
  edit(task: Task){
    //this.httpService.removeToDo(task);
    task.name = this.changedContent;
    this.httpService.updateOne(task);
    this.changedTask = null;
    this.changedContent = '';

    this.changeEditingStatus();
  }

  changeEditingStatus(task?:Task){
    if(this.nameOfChangedTask === ''){
      this.nameOfChangedTask = task.name;
      this.changedContent = task.name;
    }else{
      this.nameOfChangedTask = '';
    }

    if(this.changing === true){
      this.changing = false;
    }
    else {
      this.changing = true;
    }
  }

}
