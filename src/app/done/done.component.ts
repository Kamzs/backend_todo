import {Component} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {Task} from '../jso/task';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {

  toShow: Array<Task>;

  constructor(private logicService: LogicService, private httpService: HttpService) {
    this.logicService.getObservableTasksDone().subscribe((received: Array<Task>) => this.toShow = received );
  }

  remove(task: Task) {
    this.httpService.removeToDo(task);
  }
}
