import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DoneComponent } from './done/done.component';
import { InputComponent } from './input/input.component';
import { OwnDirectiveDirective } from './shared/own-directive.directive';
import { DateDirective } from './shared/date.directive';
import { ModyfyPipe } from './shared/modyfy.pipe';
import { SortPipe } from './shared/sort.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    DoneComponent,
    InputComponent,
    OwnDirectiveDirective,
    DateDirective,
    ModyfyPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
