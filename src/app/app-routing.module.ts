import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoneComponent} from './done/done.component';
import {InputComponent} from './input/input.component';
import {TodoComponent} from './todo/todo.component';
import {DetailsComponent} from './details/details.component';
import {LoginComponent} from "./auth/login/login.component";
import {AuthRulesService} from "./auth/auth-rules.service";

const routes: Routes = [

  {
    path: 'add',
    component: InputComponent
  },
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthRulesService]
  },
  {
    path: 'done',
    component: DoneComponent,
    canActivate: [AuthRulesService],
    children:
    [
      {
        path: ':id',
        component: DetailsComponent,
        canActivate: [AuthRulesService]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
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
