import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {LogicService} from '../logic.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  toShow: Array<string>;

  constructor(private service: LogicService) {
    this.service.getObservableTasksToDo().subscribe(received => this.toShow = received );
  }

  markDone(task: string) {
    this.service.addDone(task);
  }
  remove(task: string) {
    this.service.removeToDo(task);
  }

}
