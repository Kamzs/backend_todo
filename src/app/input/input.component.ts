import { Component} from '@angular/core';
import {LogicService} from '../logic.service';
import {HttpService} from '../http.service';
import {Task} from '../task';
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
