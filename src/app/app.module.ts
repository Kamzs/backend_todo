import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DoneComponent } from './done/done.component';
import { InputComponent } from './input/input.component';
import { OwnDirectiveDirective } from './directives/own-directive.directive';
import { DateDirective } from './directives/date.directive';
import { ModyfyPipe } from './pipes/modyfy.pipe';
import { SortPipe } from './pipes/sort.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpyInterceptor} from './interceptors/spy.interceptor';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AppRoutingModule} from './app-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    DoneComponent,
    InputComponent,
    OwnDirectiveDirective,
    DateDirective,
    ModyfyPipe,
    SortPipe,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
