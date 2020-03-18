import { Injectable } from '@angular/core';
import {LogicService} from "./logic.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import { Task } from '../jso/task';
import {User} from "firebase";
import {HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpCloudService {
  todoCollectionRef: AngularFirestoreCollection<Task>;
  todo$: Observable<Task[]>;

  user: User;
  tasksForUser: BehaviorSubject<Array<Task>> = new BehaviorSubject<Array<Task>>([]);

  constructor(private afs: AngularFirestore, private logicService: LogicService) {
    this.todoCollectionRef = this.afs.collection<Task>('todos');
    this.todo$ = this.todoCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Task;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    })
  );
    this.getUpdated().subscribe((answer: Array<Task>) => {

        this.logicService.tasksToDO = answer.filter((value: Task) => value.done === null);
        this.logicService.subjectTasksToDo.next(this.logicService.tasksToDO);

        this.logicService.tasksDone = answer.filter((value: Task) => value.done !== null);
        this.logicService.subjectTasksDone.next(this.logicService.tasksDone);
      },
      error => console.log(error)
    );
  }

/*  getTaskFromStorage(): Observable<Array<Task>> {
    let param;
    if(this.user){
      param = new HttpParams().set('fire', this.user.uid);
    }
    else{
      param = new HttpParams().set('fire', '');
    }
    return this.httpClient.get<Array<Task>>(this.url + '/findAll', {params: param});
  }*/

  getUpdated(): Observable<Array<Task>>{
    return this.tasksForUser.asObservable();
  }

  extractOnlyWithCorrectFirebaseID(): void {

    let id;
    if(this.user){id = this.user.uid;}
    else{id = '';}

    this.todo$.subscribe(listOfTasks => {
      this.tasksForUser.next(listOfTasks
        .filter( (elem: Task)=>{elem.fire = id;}))
  });
  }


  setUser(user: User){
    this.user = user;
    this.extractOnlyWithCorrectFirebaseID();
  }


  addToDo(tasks : Array<Task>) {
    for (let task of tasks) {
      this.todoCollectionRef.add(task);
      this.extractOnlyWithCorrectFirebaseID();
    }
  }

  updateOne(task: Task) {
    this.todoCollectionRef.doc(task.id).delete();
    this.todoCollectionRef.add(task);
    this.extractOnlyWithCorrectFirebaseID();
  }

  removeToDo(task: Task) {
    this.todoCollectionRef.doc(task.id).delete();
    this.extractOnlyWithCorrectFirebaseID();
  }

}
