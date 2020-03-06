import { Component } from '@angular/core';
import { Task } from '../jso/task';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  details: Task = {created: undefined, done: undefined, id: '', name: ''};

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) {
    let taskID;
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      taskID = params.get('id');
      this.httpService.getTaskFromStorage().subscribe((tasks: Array<Task>) => {
        this.details = tasks.find(task => task.id === taskID);
      });
    });
  }


}
