import {Component, Input, OnInit} from '@angular/core';
import {LogicService} from '../logic.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {

  toShow: Array<string>;


  constructor(private service: LogicService) {
    this.service.getObservableTasksDone().subscribe(received => this.toShow = received );
  }
}
