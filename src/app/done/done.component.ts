import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {

  @Input()
  tasksDoneInputField: Array<string>;

}
