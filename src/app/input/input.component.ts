import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  inputField: string = 'enterText';

  @Output()
  emiter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  clear() {
    this.inputField = '';
    console.log('aaa');
  }

  send() {
    this.emiter.emit(this.inputField);
  }

}
