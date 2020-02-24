import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasksNotDone: Array<string> = [];
  tasksDone: Array<string> = [];


  addNew(newTaskReceived) {
    this.tasksNotDone.push(newTaskReceived);
    console.log(this.tasksNotDone);
  }

  updateListToDo(element: string) {
    this.tasksNotDone = this.tasksNotDone.filter(e => e !== element);
  }
  updateListDone(element: string) {
    this.tasksDone.push(element);
  }
}
