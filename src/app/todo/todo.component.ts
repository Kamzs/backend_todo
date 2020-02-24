import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input()
  listOfTasks: Array<string> = [];

  @Output()
  emiterToDoDelete = new EventEmitter<string>();

  @Output()
  emiterDone = new EventEmitter<string>();

  markDone(element: string) {
    this.listOfTasks = this.listOfTasks.filter(e => {
      // tslint:disable-next-line: no-unused-expression
      e !== element;
    });
    this.emiterToDoDelete.emit(element);
    this.emiterDone.emit(element);

  }
  remove(element) {
    this.listOfTasks = this.listOfTasks.filter(e => {
      // tslint:disable-next-line: no-unused-expression
      e !== element;
    });
    this.emiterToDoDelete.emit(element);
  }

}
