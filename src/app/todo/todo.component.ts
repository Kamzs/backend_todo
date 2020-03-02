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

}
