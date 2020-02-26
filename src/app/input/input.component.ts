import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LogicService} from '../logic.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  inputField: string = 'enter text here';

  constructor(private service: LogicService) {
  }

  ngOnInit(): void {
  }

  clear() {
    this.inputField = '';
  }

  add() {
    this.service.addToDo(this.inputField);
    this.inputField = 'enter text here';
  };

}
