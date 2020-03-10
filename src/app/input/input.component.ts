import {Component, OnInit} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {HttpService} from '../services/http.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Task } from '../jso/task';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  addForm: FormGroup;
  arrayOfTasks: Array<Task> = [];
  constructor(private logicService: LogicService, private httpService: HttpService) {}

  ngOnInit(): void {
        this.addForm = new FormGroup(
          {
            inputFields: new FormArray([new FormControl(null, Validators.required)])
          }
        );
    }

  createNew() {
    const arr = <FormArray> this.addForm.get('inputFields');
    arr.push(new FormControl(null, Validators.required));
  }

  add() {

    let arrayOfInputFields = <[string]>this.addForm.get('inputFields').value;
    arrayOfInputFields.forEach(newTaskName => {
      this.arrayOfTasks.push({name: newTaskName, created: new Date()});
      }
    );
    this.httpService.addToDo(this.arrayOfTasks);
    this.arrayOfTasks=[];
  }
}
