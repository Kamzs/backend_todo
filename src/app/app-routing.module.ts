import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoneComponent} from './done/done.component';
import {InputComponent} from './input/input.component';
import {TodoComponent} from './todo/todo.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [

  {
    path: 'add',
    component: InputComponent
  },
  {
    path: 'todo',
    component: TodoComponent
  },
  {
    path: 'done',
    component: DoneComponent,
    children:
    [
      {
        path: ':id',
        component: DetailsComponent
      }
    ]
  },
  {
    path: '**',
    component: InputComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
