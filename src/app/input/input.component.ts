import {Component, OnInit} from '@angular/core';
import {LogicService} from '../services/logic.service';
import {HttpService} from '../services/http.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  addForm: FormGroup;
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
    let arrayOfInputFields = <FormArray>this.addForm.get('inputFields');
    let sizeOfAr = arrayOfInputFields.length;
    for (let i = 0 ;i < sizeOfAr; i++){
      //console.log(this.addForm.get('inputFields').value[i]);
      let task = ({name: this.addForm.get('inputFields').value[i], created: new Date()});
      this.httpService.addToDo(task);
    }
  }

}
