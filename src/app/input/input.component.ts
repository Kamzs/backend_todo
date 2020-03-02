import { Component} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {HttpService} from '../services/http.service';
import {Task} from '../jso/task';
import {TaskLogger} from 'protractor/built/taskLogger';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  inputField: string = 'enter text here';

  constructor(private logicService: LogicService, private httpService: HttpService) {};

  clear() {
    this.inputField = '';
  }

  add() {
    const task = ({name: this.inputField, created: new Date()});
    this.inputField = 'enter text here';
    this.httpService.addToDo(task);
  };

}
