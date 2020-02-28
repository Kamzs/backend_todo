import {Component} from '@angular/core';
import {LogicService} from '../logic.service';
import {Task} from '../task';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {

  toShow: Array<Task>;

  constructor(private service: LogicService) {
    this.service.getObservableTasksDone().subscribe((received: Array<Task>) => this.toShow = received );
  }
}
