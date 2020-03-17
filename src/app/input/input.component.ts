import {Component, OnInit} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {HttpService} from '../services/http.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Task } from '../jso/task';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  addForm: FormGroup;
  constructor(private logicService: LogicService, private httpService: HttpService, private authService: AuthService) {}

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
    let arrayOfTasks = [];
    arrayOfInputFields.forEach(newTaskName => {
        let task =
        {
          fire: this.authService.user.uid,
          name: newTaskName,
          created: new Date()
        };
      arrayOfTasks.push(task);
      }
    );
    this.httpService.addToDo(arrayOfTasks);
  }
}
